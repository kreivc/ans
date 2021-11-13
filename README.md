ANS
===
This project is a q&a forum about anything tech-related.

Developing
===
Firstly, download the repository.

    git clone https://github.com/kreivc/ans

Initialize freshly cloned repository.

    composer install
    yarn --ignore-scripts

When developing, you would need a running database only. Make sure your MySQL credentials match your local machine's database. Check `.env.example` for reference.

Things to notice:
- DB_DATABASE
- DB_USERNAME
- DB_PASSWORD

To synchronize database with the project:

    php artisan migrate

!! Dangerously sync (+ table dropping):

    php artisan migrate:fresh

To start developing, you would need two simultaneously running commands:

    php artisan serve

    yarn watch
