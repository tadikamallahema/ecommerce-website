import db from '../config/db.js'

export const verifyEmail = async (req,res)=>{
    try{

        const {token} = req.params;
            console.log(token)
        const [rows] = await db.execute(
            `SELECT * FROM users 
             WHERE email_verification_token=?`,
            [token]
        );

        if(rows.length === 0){
            return res.status(400).json({
                message:"Invalid verification link"
            });
        }

        const user = rows[0];

        if(new Date(user.email_verification_expiry) < new Date()){
            return res.status(400).json({
                message:"Verification link expired"
            });
        }

        await db.execute(
            `UPDATE users 
             SET is_email_verified = true,
             email_verification_token = NULL,
             email_verification_expiry = NULL
             WHERE id = ?`,
            [user.id]
        );

        res.json({message:"Email verified successfully"});

    }catch(err){
        res.status(500).json({message:err.message});
    }
};