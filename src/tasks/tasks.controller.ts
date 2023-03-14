import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { Task, TaskStatus } from './tasks.model';
import { TasksService } from './tasks.service';
import { v4 as uuid } from 'uuid';
import { CreateTaskDto } from './dto/create-task-dto';
import { GetTaskFilterDto } from './dto/get-task-filter-dto';
import { UpdateTaskStatusDto } from './dto/update-task-status-dto';
//start 19
@Controller('tasks')
export class TasksController {
  constructor(private taskService: TasksService) {}

  @Get()
  getTasks(@Query() filterDto: GetTaskFilterDto): Task[] {
    if (Object.keys(filterDto).length) {
      return this.taskService.getTasksWithFilters(filterDto);
    } else {
      return this.taskService.getAllTask();
    }
  }

  @Get('/:id')
  getTaskById(@Param('id') id: string): Task {
    const result = this.taskService.getTaskById(id);
    if (!result) {
      throw new NotFoundException(`Task with that ID "${id}" not found`);
    }
    return result;
  }

  @Post()
  createTask(@Body() createTaskDto: CreateTaskDto): Task {
    return this.taskService.createTask(createTaskDto);
  }

  @Delete('/:id')
  deleteTask(@Param('id') id: string): void {
    const found = this.getTaskById(id);
    if (!found) {
      throw new NotFoundException(`Task with that ID "${id}" not found`);
    } else {
      return this.taskService.deleteTask(id);
    }
  }

  @Patch('/:id/status')
  updateTaskStatus(
    @Param('id') id: string,
    @Body() updateTaskStatusDto: UpdateTaskStatusDto ,
  ): Task {
    const { status } =  updateTaskStatusDto;
    return this.taskService.updateTaskStatus(id, status);
  }
}
