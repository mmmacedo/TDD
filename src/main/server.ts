import { app } from './config/app'

const port = 8080
app().listen(port, () => console.log(`Server running at http:localhost:${port}`))