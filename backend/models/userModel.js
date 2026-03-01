import db from '../config/db.js';

export const createUserTable=()=>{
    db.execute(
        `create table if not exists users(
        id int auto_increment primary key ,
        name varchar(100) not null,
        phone_number varchar(25) unique,
        email varchar(100) unique,
        password varchar(255) not null,
        is_active boolean default true,
        is_email_verified boolean default false,

        created_at timestamp default current_timestamp,
        updated_at timestamp default current_timestamp on update current_timestamp

        )`
    );
    console.log("Table is created");
};

export const alterUserTable=()=>{
    db.execute(
        `ALTER TABLE users
    ADD COLUMN role ENUM('user','vendor','admin')
    NOT NULL DEFAULT 'user'`
    );
    console.log("Altered table by adding rows");
};


export const createUser=async(name,phone_number,email,password)=>{
    const [result]=await db.execute(
    `insert into users(name,phone_number,email,password) values(?,?,?,?)`,
    [name,phone_number,email,password]);

    return result;
}
export const getUserByEmail=async(email)=>{
    const [row]=await db.execute(
        `select * from users where email=? and is_active=true`,[email]
    );
    return row[0];
}
export const getUserById=async(Id)=>{
    const [row]=await db.execute(
        `select name,phone_number,email,is_active from users where id=?`,[Id]
    );
    return row[0];
}
export const isEmailExist=async(email)=>{
    const [row]=await db.execute(
        `select id from users where email=?`,[email]
    );
    return row.length>0;
}
export const getAllUsers=async()=>{
    const [row]=await db.execute(
        "select id,name,phone_number,email from users"
    );
    return row;
}

export const updateUser=async(id,name,phone_number)=>{
    const [res]=await db.execute(
        `update users set name=?, phone_number=? where id=?`,[name,phone_number,id]
    );
    return res;
}

export const deleteUser=async(id)=>{
    const [res]=await db.execute(
        `update users set is_active=false where id=?`,[id]
    );
    return res;
}