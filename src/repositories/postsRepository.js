import { connectionDB } from "../database/db.js";

export function createPost(user, infos, data) {
  return connectionDB.query(
    `
    INSERT INTO posts (user_id, description, likes, link, link_title, link_description, link_image)
        VALUES ($1, $2, $3, $4, $5, $6, $7)`,
    [user.id, infos.description, 0, infos.link, data.title, data.description, data.icon]
  );
}

export function getPost() {
  return connectionDB.query(`
    SELECT posts.*,
    users.picture_url AS picture_user,
    users.username
    FROM posts
    JOIN users ON posts.user_id = users.id
    ORDER BY posts.id DESC
    LIMIT 20`);
}

export function updatePost(body) {
  return connectionDB.query(
    `UPDATE posts
        SET description = $1 WHERE id = $2`,
    [body.description, body.id]
  );
}
