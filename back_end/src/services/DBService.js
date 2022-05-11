import { DB_CONNECTION } from "../config/petsDB.js";

export async function QuerySecure(SQL, SQL_PARAMS = "") {
    return new Promise((resolve, reject) => {
        return DB_CONNECTION.query(SQL, SQL_PARAMS, (err, result) => {
            if (err) {
                return reject(err);
            }
            resolve(result);
        });
    });
}