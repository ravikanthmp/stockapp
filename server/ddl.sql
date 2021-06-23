create table users
(
    id         bigint primary key auto_increment,
    first_name varchar(30),
    last_name  varchar(30),
    email      varchar(100),
    password   char(60)
);

create table watchlist
(
    id      bigint primary key auto_increment,
    user_id bigint,
    constraint user_id_fk foreign key (user_id) references users (id)
        on DELETE cascade
        on update cascade
);

create table stock
(
    ticker        char(10) primary key unique,
    current_price float
);

create table options
(
    underlying    char(10),
    name          varchar(30) primary key unique,
    current_price float,
    constraint foreign key (underlying) references stock (ticker) on UPDATE cascade on DELETE cascade
);

create table stock_watchlist
(
    ticker       char(10),
    watchlist_id bigint,
    constraint foreign key (ticker) references stock (ticker) on UPDATE cascade on DELETE cascade,
    constraint foreign key (watchlist_id) references watchlist (id) on UPDATE cascade on DELETE cascade,
    primary key (ticker, watchlist_id)
);

create table options_watchlist
(
    name         varchar(30),
    watchlist_id bigint,
    constraint foreign key (name) references options (name) on UPDATE cascade on DELETE cascade,
    primary key (name, watchlist_id)
);


create table stock_price_historical_daily
(
    ticker char(10),
    day    timestamp,
    open   float,
    high   float,
    low    float,
    close  float,
    volume bigint,
    constraint foreign key (ticker) references stock (ticker) on UPDATE cascade on DELETE cascade,
    primary key (ticker, day)
);