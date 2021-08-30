## 1. rabbitmq 설치

```
brew install rabbitmq
```

## 2. 서버 실행

```
// background
brew services start rabbitmq

// foreground
/usr/local/opt/rabbitmq/sbin/rabbitmq-server
```

---

> ### config 및 로그 파일 위치
>
> - config : /usr/local/etc/rabbitmq
>
> - log : /usr/local/var/log/rabbitmq
> - 추가로 rabbitmqctl, admin등은 /usr/local/sbin 폴더에서 실행 가능

> ### nxdomain (non-existing domain) 에러 처리
>
> : 개고생한 nxdomain,
> config파일에서 rabbit@localhost -> rabbit으로 고치니까 되었다.
> 아무래도 내 맥북은 localhost alias가 잘 안되어있는듯 하다.
