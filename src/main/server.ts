import { app } from '../main/app/app'

const port = 8080
app().listen(port, () => console.log(`Server running at http:localhost:${port}`))
