import db from '../config/db.js';

export const createReviewTable=()=>{
    db.execute(
        `create table if not exists review(
        id int auto_increment primary key,
        user_id int not null,
        product_id int not null,
        rating int ,
        comment text,
        created_at timestamp default current_timestamp,
        UNIQUE(user_id, product_id),
        foreign key(user_id) references users(id),
        foreign key(product_id) references product(id)
        )`
    );
    console.log("Review table is created");
}

export const addReview=async(user_id,product_id,rating,comment)=>{
    const [row]=await db.execute(
        `insert into review(user_id,product_id,rating,comment)
        values (?,?,?,?)`, [user_id,product_id,rating,comment]
    );
    return row;
}
export const getReviewByProduct=async(product_id)=>{
    const [row]=await db.execute(
        `select r.*,u.name from review r
        join users u on r.user_id=u.id where product_id=?`,[product_id]
    );
    return row;
}