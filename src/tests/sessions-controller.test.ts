import request from "supertest"
import {app} from "@/app"
import {prisma} from "@/database/prisma "


describe("SessionsController",()=>{
    let user_id: string
    afterAll(async()=>{
        await prisma.user.delete({
            where: {id:user_id}
        })
    })
    it("should authenticate a and get classes access token", async ()=>{
        const userResponse = await request(app).post("/users").send({
            name:"TestUsere",
            email:"Teste1@example.com",
            password:"123456seven"
            })
            user_id = userResponse.body.id


            const sessionResponse = await request(app).post("/sessions").send({
                name:"TestUsere",
                email:"Teste1@example.com",
            })

            expect(sessionResponse.status).toBe(200)
            expect(sessionResponse.body.token).toEqual(expect.any(String))
    })
})