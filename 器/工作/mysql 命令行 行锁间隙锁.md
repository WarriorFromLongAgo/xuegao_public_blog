
# 事务


## 修改where = 时，网上说锁的时间隙，但是间隙是单行的间隙
假设age有1，5，10，15，5，10，15，20，锁的是（5，15），锁的是范围。
update name where age = 10;
感觉就是，锁的是两个（5，15）？

```sql
create table account
(
    id    int auto_increment
        primary key,
    name  varchar(64)    null,
    money decimal(12, 4) null,
    age   int default 0,
    index idx_age (age)
);

insert into account(id, name, money, age)
values (null, '1', null, 1),
       (null, '2', null, 2),
       (null, '3', null, 3),
       (null, '2', null, 2),
       (null, '3', null, 3),
       (null, '2', null, 2),
       (null, '1', null, 1);

start transaction;

update account
set money = 0.2
where age = 2;

commit;

rollback ;

```

```sql

update account
set money = 0.3
where age = 3;


update account
set money = 0.2
where age = 2;

```
# 新增时不会间隙锁
```sql
create table account
(
    id    int auto_increment
        primary key,
    name  varchar(64)    null,
    money decimal(12, 4) null,
    age   int default 0,
    index idx_age (age)
);

INSERT INTO test.account (id, name, money, age)
VALUES (1, '1', null, 1);
INSERT INTO test.account (id, name, money, age)
VALUES (2, '2', null, 2);
INSERT INTO test.account (id, name, money, age)
VALUES (3, '3', null, 3);
INSERT INTO test.account (id, name, money, age)
VALUES (100, '2', null, 2);
INSERT INTO test.account (id, name, money, age)
VALUES (101, '3', null, 3);
INSERT INTO test.account (id, name, money, age)
VALUES (1000, '2', null, 2);
INSERT INTO test.account (id, name, money, age)
VALUES (1001, '1', null, 1);

start transaction;

insert into account(id, name, money, age)
values (4, '2', null, 2),
       (102, '2', null, 2)
;

commit;

rollback;

```

```sql
insert into account(id, name, money, age)
values (5, '3', null, 3),
       (103, '3', null, 3)
;
```

# select for update 查询的是索引，那么是间隙锁

```sql
create table account
(
    id    int auto_increment
        primary key,
    name  varchar(64)    null,
    money decimal(12, 4) null,
    age   int default 0,
    index idx_age (age)
);

INSERT INTO test.account (id, name, money, age)
VALUES (1, '1', null, 1);
INSERT INTO test.account (id, name, money, age)
VALUES (2, '2', null, 2);
INSERT INTO test.account (id, name, money, age)
VALUES (3, '3', null, 3);
INSERT INTO test.account (id, name, money, age)
VALUES (100, '2', null, 2);
INSERT INTO test.account (id, name, money, age)
VALUES (101, '3', null, 3);
INSERT INTO test.account (id, name, money, age)
VALUES (1000, '2', null, 2);
INSERT INTO test.account (id, name, money, age)
VALUES (1001, '1', null, 1);

begin;

select *
from account
where id >= 2
  and id <= 101 for
update;

commit

```

```sql

INSERT INTO test.account (id, name, money, age)
VALUES (4, '2', null, 2);

```

# select for update 查询的不是索引，那么锁表
```sql
begin;

select *
from account
where money >= 2
  and money <= 101 for
update;

commit
```

```sql
INSERT INTO test.account (id, name, money, age)
VALUES (4, '2', null, 2);



INSERT INTO test.account (id, name, money, age)
VALUES (1002, '2', 1002, 2);
```

# 索引和锁的关系
锁是加在索引上的：

无索引：因为mysql的锁都是在索引上，如果没有索引则是使用表锁

Mysql MVCC解决了RR事务的可重复读问题，使用间隙锁解决了RR级别的幻读问题

Mysql的间隙锁是为了在RR级别解决幻读问题而引入的，间隙锁是gap lock ,而mysql 用的是间隙锁和gap锁的结合，也就是next-key lock,而在不同的索引上，mysql加锁的方式也不一样：























