#README DB設計 

## usersテーブル

|Column|Type|Options|
|------|----|-------|
|name|string|null: false|
|mail|string|null: false, unipue: true|

### Association
- has_many :groups, through: :group_users
- has_many :group_users
- has_many :massages

## groups_usersテーブル

|Column|Type|Options|
|------|----|-------|
|group_name|string|null: false, unipue: true|

### Association
- has_many :groups, through: :group_users
- has_many :group_users
- has_many :massages

## messagesテーブル

|Column|Type|Options|
|------|----|-------|
|body|text||
|image|string|null: true|
|group_id|integer|foreign_key: true|
|user_id|integer|foreign_key: true|

### Association
- belongs_to :user
- belongs_to :group


## groups_usersテーブル

|Column|Type|Options|
|------|----|-------|
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|

### Association
- belongs_to :group
- belongs_to :user

This README would normally document whatever steps are necessary to get the
application up and running.

Things you may want to cover:

* Ruby version

* System dependencies

* Configuration

* Database creation

* Database initialization

* How to run the test suite

* Services (job queues, cache servers, search engines, etc.)

* Deployment instructions

* .....