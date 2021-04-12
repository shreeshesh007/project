import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../user.service';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css']
})
export class NotesComponent implements OnInit {
 
  filterTerm: string;
  userObj1;
  userObj;
  username;
  notes;
  id1;
  session = true;

  update = {title:"" , note : " ",id:""}
  constructor(private us:UserService , private ru:Router , private ts:ToastrService) { }

  ngOnInit(): void {


    


    



















  
   this.username = localStorage.getItem("username")
   this.onCall()
   this.onDelete;
  }
  

  onSubmit(value){
    this.userObj1 = value.value;
    this.username = localStorage.getItem("username");
    this.userObj1.username=this.username
    this.userObj1.id=Date.now().toString();
    this.us.createNotes(this.userObj1).subscribe(
      res => {
        if(res["message"]=="notes created")
        {
         
          this.onCall()
          this.ts.success('notes created successfully')
        }
        else if(res["message"]=="session expired..plz relogin to continue")
        {
          this.session=!this.session
          alert(res["message"]);
          this.ru.navigateByUrl("/login");
        }
      },
      err=>{
        console.log(err);
        alert("something went wrong");
      }
    )

  }

  onCall()
  {
       
    this.us.getDetails(this.username).subscribe(
      res=>{
        if(res["message"]=="success")
        {
            this.notes= res["notes"];
        }
        else if(res["message"]=="session expired..plz relogin to continue")
        {
          this.session=!this.session
          alert(res["message"]);
          this.ru.navigateByUrl("/login");
        }
      },
      err=> console.log("something went wrong")
    )
  }


 onDelete(id)
    {
        this.us.deleteNotes(id).subscribe(
        res=>{
       
          if(res["message"]=="success")
          {
            this.onCall()
            this.ts.warning('notes deleted')
          }
          else if(res["message"]=="session expired..plz relogin to continue")
          {
            this.session=!this.session
            alert(res["message"]);
            this.ru.navigateByUrl("/login");
          }
        },
        err=>{
          console.log(err);
          alert("something wrong");
        }
      )
    }


    gotoModal(v)
    {
      console.log(v);
      this.update.title= v.title;
      this.update.note = v.note;
      this.update.id = v.id;
    }

    save()
    {
      console.log(this.update);
      this.us.editNotes(this.update).subscribe(
        res=>{
          if(res["message"]=="success")
          {
             this.onCall()
             this.ts.info('notes updated')
          }
          else if(res["message"]=="session expired..plz relogin to continue")
          {
            this.session=!this.session
            alert(res["message"]);
            this.ru.navigateByUrl("/login");
          }
        },
        err=>{
          console.log(err);
          alert("something wrong");
        }
      )
    }

    onLogout()
    {
      localStorage.clear();
      this.username = localStorage.getItem("username");
      this.ts.success('user logged out successfully')
      this.ru.navigateByUrl("/login");
    }


}

