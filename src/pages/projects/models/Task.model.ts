interface Task {
  name: string,
  description: string,
  status: boolean,
  deliveryDate: Date,
  priority: 'low' | 'medium' | 'high',
  project: Project,
}