import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Response } from 'express';
import { AuthGuard } from 'guards/auth.guard';
import { StatusCodes } from 'http-status-codes';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { TasksService } from './tasks.service';

@Controller('/boards/:boardId/tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Get()
  @UseGuards(AuthGuard)
  async getAllTasks() {
    //console.log('HEHE');
    return this.tasksService.getAllTasks();
  }

  @Post()
  @UseGuards(AuthGuard)
  async createTask(
    @Res() res: Response,
    @Param('boardId') boardId: string,
    @Body() createTaskDto: CreateTaskDto,
  ) {
    try {
      return res
        .status(StatusCodes.CREATED)
        .json(await this.tasksService.createTask(boardId, createTaskDto));
    } catch (err) {
      console.log('CREATE T1');
      console.log(err);
      return res.status(StatusCodes.NOT_FOUND).send('Something bad happened!');
    }
  }

  @Get(':id')
  @UseGuards(AuthGuard)
  async getTaskById(@Res() res: Response, @Param('id') taskId: string) {
    try {
      return res.json(await this.tasksService.getTaskById(taskId));
    } catch (err) {
      return res.status(StatusCodes.NOT_FOUND).send('Something bad happened!');
    }
  }

  @Put(':id')
  @UseGuards(AuthGuard)
  async update(
    @Res() res: Response,
    @Param('id') taskId: string,
    @Body() updateTaskDto: UpdateTaskDto,
  ) {
    try {
      return res.json(
        await this.tasksService.updateTask(taskId, updateTaskDto),
      );
    } catch (err) {
      console.log(err);
      return res.status(StatusCodes.NOT_FOUND).send('Something bad happened!');
    }
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  async remove(@Res() res: Response, @Param('id') taskId: string) {
    try {
      return res.json(await this.tasksService.removeTask(taskId));
    } catch (err) {
      return res.status(StatusCodes.NOT_FOUND).send('Something bad happened!');
    }
  }
}
