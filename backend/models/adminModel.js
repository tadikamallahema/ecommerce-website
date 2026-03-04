import db from '../config/db.js';

const createAdminTable=()=>{
    db.execute(
        `create table if not exists admin(
        id int auto_increment primary key,
        name varchar(100) not null,
        email varchar(100) not null unique,
        password varchar(255) not null,
        role ENUM('admin') not null default 'admin',
        is_active boolean default true,
        created_at timestamp default current_timestamp
        )`
    );
    console.log("Admin table created ");
}
export default createAdminTable;

export const createAdmin = async (name, email, password) => {
  const [res] = await db.execute(
    `INSERT INTO admin (name,email,password) VALUES (?,?,?)`,
    [name, email, password]
  );
  return res;
};

export const getAdminByEmail = async (email) => {
  const [row] = await db.execute(
    `SELECT * FROM admin WHERE email=? AND is_active=true`,
    [email]
  );
  return row[0];
};
export const updateCategory = async (id, name) => {
  const [result] = await db.execute(
    `UPDATE category SET name=? WHERE id=?`,
    [name, id]
  );

  return result;
};