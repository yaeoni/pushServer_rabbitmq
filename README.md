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

## 고민

### 1. Message queue의 필요성?

- 결합도 줄이기
- 비동기 방식 활용
- 한 쪽이 죽어도 MQ 에서 메시지 보관 가능(사고 대비) => 안정성 있는 서비스

### 2. exchange type 어떤 것을 사용할 것인가?

- fanout / direct / topic / header 중 고려
- 현재 구현하려는 기능(일반 알림 / 관리자 공지사항)
- 나는 유저별로 나누기 보다는 기능별로 queue를 나눌 것이므로 1:1 인 direct type을 사용하려고 한다.

### 3. comsumer 서버는 어떻게 설계할까?

- a) express로 한 번 감쌀까(= 웹서버 이용)
- b) node 실행파일 자체로 존재시킬까
  => consumer 딴에서 추가 API를 더 개발할 가능성이 없기 때문에 b 방안 선택
