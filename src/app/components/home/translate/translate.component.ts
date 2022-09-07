import { Component, OnInit } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import moment from 'moment';

@Component({
  selector: 'app-translate',
  templateUrl: './translate.component.html',
  styleUrls: ['./translate.component.css']
})
export class TranslateComponent implements OnInit {
  date=null;
  startDate;
  endDate;
  timeList=[];

  constructor(
    private message: NzMessageService,
  ) { }

  ngOnInit(): void {
  }


  onChange(result: Date[]): void {
    console.log('onChange: ', result);
    this.startDate=result[0];
    this.endDate=result[1];
  }


  translateData(){

    let newStartDate=moment(this.startDate).format("YYYY-MM-DD")
    let startTimeStamp=moment(newStartDate).startOf('day').format('x')
    let newEndDate=moment(this.endDate).format("YYYY-MM-DD")
    let endTimeStamp=moment(newEndDate).startOf('day').format('x')
    console.log(startTimeStamp);
    console.log("endTimeStamp"+endTimeStamp);


    let i=Number(startTimeStamp) ;

    this.timeList=[];
   while(i<=Number(endTimeStamp) ){
    this.timeList.push(i);
    i=i+86400000;
   }

   console.log(this.timeList);

   this.message.create("success",`转换成功！`);
  }
}
