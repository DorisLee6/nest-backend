import { Controller, UseInterceptors, Get, Post, Body, Query, Param } from "@nestjs/common";
import { Response, ResultInterceptor } from "src/common/interceptor/httpRequest.interceptor";
import BlogList from "../../../entity/blogList.entity";
import BlogQueryService from "./blogQuery.service";
import { QueryBlogParam, ReturnPagingData, BlogCommentsItem } from "./interfaces/blogQuery.dto";

@Controller("blogPage")
@UseInterceptors(ResultInterceptor)
export default class BlogQueryController { 
  constructor (
    private readonly blogQueryService: BlogQueryService
  ) {}

  @Post("getBlogList")
  getBlogList (@Body() reqBody: QueryBlogParam): Promise<ReturnPagingData<BlogList[]>> {
    return this.blogQueryService.getBlogList(reqBody);
  }

  @Get("getBlogDetail/:id")
  getBlogDetail (@Param() queryParams): Promise<BlogList> {
    return this.blogQueryService.getBlogDetail(queryParams.id);
  }

  @Get("getBlogComments")
  getBlogComments (@Query() queryParams: string): Promise<BlogCommentsItem[]>{
    return this.blogQueryService.getBlogComments(queryParams);
  }
}
