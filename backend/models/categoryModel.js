import db from '../config/db.js';

//in case of varchar(100),we need to specify length of that , in case of text no need of that 
const createCategoryTable=()=>{
    db.execute(
        `create table if not exists category(
        id int auto_increment primary key,
        name varchar(100) not null,
        description text,
        slug varchar(150) unique,
        image_url varchar(255),
        parent_id int null,
        is_active tinyint(1) default 1,
        sort_order int default 0,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            ON UPDATE CURRENT_TIMESTAMP,

         INDEX idx_parent_id (parent_id),
        
        FOREIGN KEY (parent_id)
            REFERENCES category(id)
            ON DELETE SET NULL
        )`
    );
    console.log("Category table created ");
}
export default createCategoryTable;

export const createCategory=async(name,description,slug,image_url)=>{
    const [row]=await db.execute(
        `insert into category(name,description,slug,image_url) values (?,?,?,?)`,[name,description,slug,image_url]
    );
    return row;
}
//deleteCategory (soft),  getCategoryTree, toggleCategoryStatus

export const updateCategory=async(id,name,description,slug,image_url,is_active,sort_order)=>{
        const [row]=await db.execute(
            `update category set name=?,description=?,slug=?,image_url=?,is_active=?,sort_order=? where id=?`,
            [name,description,slug,image_url,is_active,sort_order,id]
        );
    return row;
}
export const getCategoryById=async(id)=>{
    const [res]=await db.execute(
        `select * from category where id=? and is_active=1 and is_admin_approved=1`,[id]
    );
    return res;
}

export const getAllCategories=async()=>{
    const [rows]=await db.execute(
        `select * from category where is_active=1`
    );
    return rows;
}

export const getCategoryBySlug=async(slug)=>{
    const [res]=await db.execute(
        `select * from category where slug=?`,[slug]
    );
    return res[0];
}

export const toggleCategoryStatus=async(id,is_active)=>{
    const [res]=await db.execute(
        `update category set is_active=? where id=?`,[is_active,id]
    );
    return res;
}
export const deleteCategory=async(id)=>{
    const [res]=await db.execute(
        `update category set is_active=0 where id=?`,[id]
    );
    return res;
}

export const getCategoryTree = async () => {
  const [rows] = await db.execute(
    `SELECT * FROM category WHERE is_active = 1 ORDER BY sort_order`
  );
  return rows;
};