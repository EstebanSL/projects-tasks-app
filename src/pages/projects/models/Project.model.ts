interface Project {
  _id: string,
  name: string,
  description: string,
  deliveryDate: Date,
  client: string,
  creator: User[],
  partners: User[],
  tasks: Task[]
}