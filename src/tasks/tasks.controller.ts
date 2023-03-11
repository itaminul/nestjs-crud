import { Body, Controller, Get, Post } from '@nestjs/common';
import { Task, TaskStatus } from './tasks.model';
import { TasksService } from './tasks.service';
import { v4 as uuid} from 'uuid'

@Controller('tasks')
export class TasksController {
  constructor(private taskService: TasksService) {}

  @Get()
  getAlltasks(): Task[] {
    return this.taskService.getAllTask();
  }

  @Post()
  createTask(
    @Body('title') title: string,
    @Body('description') description: string,
    ){
    console.log('titile', title);
    console.log('des', description);
  }

}
