import db from '../config/db.js';

const createCartTable=()=>{
    db.execute(
        `create table if not exists cart(
        id int auto_increment primary key,
        user_id int not null unique ,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            ON UPDATE CURRENT_TIMESTAMP,

        foreign key(user_id) references users(id)
        on delete cascade
        )`
    );
    console.log("Cart Table created successfully");
}
export default createCartTable;

export const createCartforUser=async(userId)=>{
    const [res]=await db.execute(
        `insert ignore into cart(user_id) values(?)`,[userId]
    );
    return res;
}

export const getCartByUser=async(userId)=>{
    const [res]=await db.execute(
        `select * from cart where user_id=? `,[userId]
    );
    return res[0];
}
export const deleteCart=async(userId)=>{
    await db.execute(
        `delete from cart where user_id=?`,[userId]
    );
    
}