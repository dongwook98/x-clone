import { createMiddleware } from '@mswjs/http-middleware';
import express from 'express';
import cors from 'cors';
import { handlers } from './handlers';

/**
 * Next는 서버에서도 돌고 클라이언트에서도 돈다.
 * SSR할 때 MSW가 돌아야 하는데 현재 Next 서버쪽에서 MSW를 돌리는 방식이 매끄럽지 않다.
 * 그래서 임시로 노드 서버를 활용한다.
 */
const app = express();
const port = 9090; // 서버 포트 번호

app.use(
  cors({
    origin: 'http://localhost:3000', // 클라이언트 포트 번호
    optionsSuccessStatus: 200,
    credentials: true,
  })
);
app.use(express.json());
app.use(createMiddleware(...handlers));
app.listen(port, () => console.log(`모킹 서버 is running on port: ${port}`));
