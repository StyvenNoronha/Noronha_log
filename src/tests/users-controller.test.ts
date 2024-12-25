import request from "supertest"
import {app} from "@/app"
import {prisma} from "@/database/prisma "
describe("UsersController",()=>{
    let user_id: string
    afterAll(async()=>{
        await prisma.user.delete({
            where: {id:user_id}
        })
    })
    it("should create a new uer successfully",async ()=>{
        const response = await request(app).post("/users").send({
            name:"Test User",
            email:"Test@example.com",
            password:"123456seven"
        })
        expect(response.status).toBe(201)
        expect(response.body).toHaveProperty("id")
        expect(response.body.name).toBe("Test User")


        user_id = response.body.id
    })

    it("should throe an error if user with same email already exists",async ()=>{
        const response = await request(app).post("/users").send({
            name:"Duplicate User",
            email:"Test@example.com",
            password:"123456seven"
        })

        expect(response.status).toBe(400)
        expect(response.body.message).toBe("Um usuário com o mesmo email já existe")
    })
/*
    it("should throe a validation error if email is invalid",async () => {
        const response = await request(app).post("/users").send({
            name:"Test User",
            email: "invalid-email",
            password:"123456seven"
        })

        expect(response.status).toBe(400)
        expect(response.body.message).toBe("Um usuário com o mesmo email já existe")
    })

    */
})
