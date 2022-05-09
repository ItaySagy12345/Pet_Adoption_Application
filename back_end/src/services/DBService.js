import { DB_CONNECTION } from "../config/petsDB.js";

export async function Query(SQL) {
    return new Promise((resolve, reject) => {
        return DB_CONNECTION.query(SQL, (err, result) => {
            if (err) {
                return reject(err);
            }
            resolve(result);
        });
    });
}
