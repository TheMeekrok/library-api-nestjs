# API для бибиотеки

Запуск проекта
```
npm run start
```

### Создание книги
POST */book*
```
{
    "title": "title"
}
```

### Получение списка всех книг
GET */book*

### Изменение заголовка книги
PUT */book/{id}*
```
{
    "title": "new_title"
}
```

### Удаление книги
DELETE */book/{id}*

### Создание пользователя
POST */user*
```
{
    "name": "user_name",
    "password": "user_password"
}
```

### Получение списка всех пользователей
GET */user*

### Взять книгу
POST */user/pick/{user_id}*
```
{
    "id": book_id
}
```

### Вернуть книгу
POST */user/return/{user_id}*
```
{
    "id": book_id
}
```