/*
 * @Author: your name
 * @Date: 2021-12-21 14:18:02
 * @LastEditTime: 2022-01-04 15:06:47
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \manage-ui\src\app\components\menu\menu.component.ts
 */
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HomeComponent } from './../home/home.component';


@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
})
export class MenuComponent implements OnInit {
  constructor(private router: Router,private home:HomeComponent) {}
  page
  ngOnInit(): void {}
  go() {
    this.router.navigate(['/home/maintenance']);
  }


  getUserList(name){
    this.home.page=name
  }
}












