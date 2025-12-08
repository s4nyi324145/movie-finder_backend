CREATE TABLE `users`(
    `user_id` INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `email` VARCHAR(255) NOT NULL,
    `psw` VARCHAR(255) NOT NULL,
    `username` VARCHAR(255) NOT NULL
);
ALTER TABLE
    `users` ADD UNIQUE `users_email_unique`(`email`);
CREATE TABLE `comments`(
    `comment_id` INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `comment` TEXT NOT NULL,
    `date` DATE NOT NULL,
    `movie_id` INT NOT NULL,
    `user_id` INT UNSIGNED NOT NULL
);
ALTER TABLE
    `comments` ADD INDEX `comments_user_id_index`(`user_id`);
ALTER TABLE
    `comments` ADD CONSTRAINT `comments_user_id_foreign` FOREIGN KEY(`user_id`) REFERENCES `users`(`user_id`);