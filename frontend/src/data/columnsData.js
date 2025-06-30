import user1 from '../assets/images/user1.png'
import user2 from '../assets/images/user2.png'
import user3 from '../assets/images/user3.png'
import user4 from '../assets/images/user4.png'

export const columns = [
  {
    title: "To Do",
    color: "border-blue-500",
    tasks: [
      {
          id: 1,
        title: "Brainstorming",
        priority: "Low",
        description: "Brainstorming brings team members' diverse experience into play.",
        comments: 12,
        files: 0,
        avatars: [user1,user2],
        dueDate: "2025-07-20"
      },
      {
          id:2,
        title: "Research",
        priority: "High",
        description: "User research helps you to create an optimal product for users.",
        comments: 10,
        files: 3,
        avatars: [user2,user3,user4],
        dueDate: "2025-07-15"
      }
    ]
  },
  {
  
    title: "On Progress",
    color: "border-yellow-500",
    tasks: [
      {
          id: 3,
        title: "Wireframes",
        priority: "Low",
        description: "Low fidelity wireframes include the most basic content and visuals.",
        comments: 8,
        files: 1,
        avatars: [user2,user4],
        dueDate: "2025-06-30"
      }
    ]
  },
  {
    title: "Done",
    color: "border-green-500",
    tasks: [
      {
          id:4,
        title: "Design System",
        priority: "Completed",
        description: "It just needs to adapt the UI from what you did before.",
        comments: 5,
        files: 2,
        avatars: [user1,user2,user3,user4],
        dueDate: "2025-06-25"
      }
    ]
  }
];
