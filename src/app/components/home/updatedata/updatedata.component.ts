import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { KeycloakService } from 'keycloak-angular';
import {HttpClient} from "@angular/common/http";
import moment from 'moment';

import * as configjson from '../../../../assets/config/config.json'


@Component({
  selector: 'app-updatedata',
  templateUrl: './updatedata.component.html',
  styleUrls: ['./updatedata.component.css']
})
export class UpdatedataComponent  implements OnInit {
  validateForm!: FormGroup;




  constructor(
    private fb: FormBuilder,
    private message: NzMessageService,
    private keycloak: KeycloakService,
    public http:HttpClient)
  {}

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      kpi: [null, [Validators.required]],
      plantcode: [null, [Validators.required]],
      datePicker:[null]
    });
  }


  async submitForm(): Promise<void> {
    let year;
    let month;
    let day;
    if (this.validateForm.valid) {
      console.log('submit', this.validateForm.value);
      let dateData=this.validateForm.value.datePicker;
      year=dateData.getFullYear().toString();
      month=dateData.getMonth()+1>=10?(dateData.getMonth()+1).toString():'0'+(dateData.getMonth()+1).toString();
      day=dateData.getDate()>=10?dateData.getDate().toString():'0'+dateData.getDate().toString();
      let correctDate=year+'-'+month+'-'+day;

      let plantCode=this.validateForm.value.plantcode;
      let kpi=this.validateForm.value.kpi;


      let userMsg = await this.keycloak.loadUserProfile();
      let empNo=userMsg.username;
      console.log('empNo'+empNo);

      console.log('dateData'+correctDate);


      let postData='plantCode='+plantCode+"&Period="+correctDate+"&empNo="+empNo+"&kpi="+kpi;
      let apiUrl=configjson.api+'/dpm/resend?'+postData;

      console.log("apiUrl------"+apiUrl);

      let today=moment().format("YYYY-MM-DD")
      console.log('today'+today);
      let selectedDate=moment(correctDate).format("YYYY-MM-DD")
      console.log('selectedDate'+selectedDate);

      let days=moment(today).diff(moment(selectedDate), 'days');
      console.log('days'+days);

      if(kpi='OEE(NEW)' && Number(days) <7 && Number(days) >0){
        this.http.post(apiUrl,{},{}).subscribe((response:any)=>{
          console.log(response);

        })

        this.message.create("success",`提交成功！`);
      }else{
        this.message.create("error",`提交失败！OEE不可以选择当天或者大于7天日期！`);
      }



    } else {
      Object.values(this.validateForm.controls).forEach(control => {
        console.log('control'+control);

        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }



  date = null;

  // onChange(result: Date): void {

  //   let year=result.getFullYear().toString();
  //   let  month=result.getMonth()+1>=10?(result.getMonth()+1).toString():'0'+(result.getMonth()+1).toString()
  //  let  day=result.getDate()>=10?result.getDate().toString():'0'+result.getDate().toString()
  //  let selectDate=year+month.toString()+day;
  //   console.log('onChange: ', selectDate);
  // }
}
