import db from '../config/db.js'

export const createAddressTable=()=>{
    db.execute(
        `create table if not exists addresses(
        id int auto_increment primary key,
        user_id int not null,
        full_name VARCHAR(100) NOT NULL,
        phone VARCHAR(15) NOT NULL,
        address_line TEXT NOT NULL,
        city VARCHAR(100) NOT NULL,
        state VARCHAR(50) NOT NULL,
        pincode VARCHAR(10) NOT NULL,
        created_at timestamp default current_timestamp,

        foreign key(user_id) references users(id) on delete cascade
        )`
    );
    console.log("Address table is created ");
}

export const addAddress=async(user_id,full_name,phone,address_line,city,state,pincode)=>{
    const [res]=await db.execute(
        `insert into addresses(user_id,full_name,phone,address_line,city,state,pincode)
        values (?,?,?,?,?,?,?)`,[user_id,full_name,phone,address_line,city,state,pincode]
    );
    return res.insertId;
}

export const getUserAddress=async(userId)=>{
    const [rows]=await db.execute(
        `select * from addresses where user_id=?`,[userId]
    );
    return rows;
}

export const updateAddresses=async(id,user_id,full_name,phone,address_line,city,state,pincode)=>{
    const [row]=await db.execute(
        `update addresses set full_name=?,phone=?,address_line=?,city=?,state=?,pincode=?
        where id=? and user_id=?`,
        [full_name,phone,address_line,city,state,pincode,id,user_id]
    );
    return row;
}

export const addressDelete=async(id,userId)=>{
    const [row]=await db.execute(
        `delete from addresses where id=? and user_id=?`,
        [id,userId]
    );
    return row;
}