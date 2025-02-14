import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Phone, Video, Send, MoveLeftIcon } from "lucide-react"
import { components } from "react-select"
import { Search } from "lucide-react"
const users = [
  { id: 1, name: "Alice", avatar: "/placeholder.svg?height=32&width=32" },
  { id: 2, name: "Bob", avatar: "/placeholder.svg?height=32&width=32" },
  { id: 3, name: "Charlie", avatar: "/placeholder.svg?height=32&width=32" },
]

const messages = [
  { id: 1, content: "Hey, how are you?", sender: "user" },
  { id: 2, content: "I'm good, thanks! How about you?", sender: "other" },
  { id: 3, content: "I'm doing well. Did you see the new movie that came out?", sender: "user" },
  { id: 4, content: "Not yet, but I've heard good things about it. We should go watch it sometime!", sender: "other" },
]

export default function ChatSpace() {
  return (
    <div className="flex h-screen bg-gray-100">

      <div className="w-64 sm:w-96 bg-white border-r">
        <div className="p-4 font-semibold text-2xl">Chats</div>
        <div className="relative w-full max-w-md pr-6 pl-6">
          <Search className="absolute left-9 top-1/2 -translate-y-1/2 text-gray-500" size={20} />
          <Input
            type="text"
            placeholder="Search"
            className="pl-10"
          />
        </div>
        <div className="space-y-2 pt-4 pl-2">
          {users.map((user) => (
            <button key={user.id} className="flex items-center w-full p-2 hover:bg-gray-100">
              <Avatar className="h-10 w-10 mr-2">
                <AvatarImage src={user.avatar} alt={user.name} />
                <AvatarFallback>{user.name[0]}</AvatarFallback>
              </Avatar>
              <span>{user.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Main chat area */}
      <div className="flex-1 flex flex-col">
        {/* Chat header */}
        <div className="bg-white p-4 flex items-center justify-between border-b">
          <div className="flex items-center">
            <Avatar className="h-12 w-12 mr-2">
              <AvatarImage src={users[0].avatar} alt={users[0].name} />
              <AvatarFallback>{users[0].name[0]}</AvatarFallback>
            </Avatar>
            <span className="font-semibold text-lg">{users[0].name}</span>
          </div>
          <div className="flex space-x-2">
            <Button variant="ghost" size="icon">
              <Phone className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon">
              <Video className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Chat messages */}
        <Card className="flex-1 m-4 overflow-y-auto">
          <CardContent className="p-4 space-y-4">
            {messages.map((m) => (
              <div key={m.id} className={`flex ${m.sender === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`max-w-[70%] p-2 rounded-lg ${m.sender === "user" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
                >
                  {m.content}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Input area */}
        <CardFooter className="bg-white border-t p-4">
          <div className="flex w-full space-x-2 justify-center items-center">
            <Input placeholder="Type your message..." className="flex-grow h-16 font-lg" />
            <Button size="icon">
              <Send className="h-10 w-10" />
            </Button>
          </div>
        </CardFooter>
      </div>
    </div>
  )
}

