import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import * as echarts from 'echarts';
import { AdminService } from 'src/app/services/admin.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UserServiceService } from 'src/app/services/user-service.service';
import { PatientService } from 'src/app/services/patient.service';
import { Patient } from 'src/app/modele/patient';
import { AvisServiceService } from 'src/app/services/avis.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private ar : ActivatedRoute , private service : AdminService ,
    private patientService :PatientService,  private router : Router , private avisService :AvisServiceService ) 
  {
    ar.params.subscribe(val => {
      this.ngOnInit();
    })
  }
  nbrPatientsCeMois : number ; 
  nbrPatientsCetteAnnee : number ;   
  nbrPatientsCetteSemaine : number ;
  test : any ; 
  retrieveResponse: any={};
  base64Data: any;
  id : number ;
  admin : any ; 
  imagePath : string ;
  username : string ;  
  role : string ;
  adminDigital:string ="adminDigital";
  adminMedical:string="adminMedical"
  roleMedical :string ="";
  roleDigital :string ="";
  AllPatientAujourdhui : any[]=[] ; 
  AllDemandesAvisEnvoyesAujourdhui : any[]=[] ; 
  lengthAllPatientsAujourdhui : any    ; 
  lengthAllDemandesEnvoyesAujourdhui : any    ; 
  autoDetectionToDay : number  ; 
  /// stat patient 
   patients1 :number ; 
   patients2 :number ; 
   patients3 :number ; 
   patients4 :number ; 
   patients5 :number ; 
   patients6 :number ; 
   patients7 :number ; 
   patients8 :number ; 
   patients9 :number ; 
   patients10 :number ; 
   patients11 :number ; 
   patients12 :number ; 

AnneeActuel : number ;
  ////////////////////////////////////////
  patientToDaycount:number = 0;
  demandeEnvoyesToDaycount:number = 0;
  detectationToDaycount:number = 0;
  telechargementToDaycount:number = 0;
  projectcountstop:any ;
  stopValue:any ;
  ngOnInit(){
    ///patient to day 
  this.getNumPatientsToDay();
  this.getAllNbrAutoDetections();
 // this.getAllNbrAutoDetections();
  this.getAllDemandesAvisEnvoyesAujourdhui();
  this.getAllNbrPatientsCeMois() ; 
  this.getAllNbrPatientsCetteAnnee();
  this.getAllNbrPatientsCetteSemaine();

  this.patientService.getNbrPatientParMonth(1).subscribe(data=>{
  this.patients1=data ;
  this.patientService.getNbrPatientParMonth(2).subscribe(data=>{
  this.patients2=data ;
  this.patientService.getNbrPatientParMonth(3).subscribe(data=>{
  this.patients3=data ;
  this.patientService.getNbrPatientParMonth(4).subscribe(data=>{
  this.patients4=data ;
  this.patientService.getNbrPatientParMonth(5).subscribe(data=>{
  this.patients5=data ;
  this.patientService.getNbrPatientParMonth(6).subscribe(data=>{
  this.patients6=data ;
  this.patientService.getNbrPatientParMonth(7).subscribe(data=>{
  this.patients7=data ;
  this.patientService.getNbrPatientParMonth(8).subscribe(data=>{
  this.patients8=data ;
  this.patientService.getNbrPatientParMonth(9).subscribe(data=>{
  this.patients9=data ;
  this.patientService.getNbrPatientParMonth(10).subscribe(data=>{
  this.patients10=data ;
  this.patientService.getNbrPatientParMonth(11).subscribe(data=>{
  this.patients11=data ;
  this.patientService.getNbrPatientParMonth(12).subscribe(data=>{
  this.patients12=data ;

     this.service.getUtilisateur(parseInt(localStorage.getItem("idAdmin"))).subscribe(res=>{
     this.test=res ; 
     console.log(this.test.role);
     if(this.test.role === "Admin Medical Manager"){
       this.roleMedical =this.test.role ; 
      this.username = localStorage.getItem("nameAdmin");
     // console.log(parseInt(localStorage.getItem('idAdmin')))
     // console.log(localStorage.getItem("nameAdmin"))
      this.service.getAdminMedicall(parseInt(localStorage.getItem('idAdmin'))).subscribe(data=>{
        this.admin=data
              if(this.admin.image ==null){
                this.imagePath="./assets/imagesD/faces/user.jpg"
              }
              else{
              this.retrieveResponse = this.admin;
              this.base64Data = this.retrieveResponse.image;
              this.imagePath = 'data:image/jpeg;base64,' + this.base64Data; }
             // console.log(this.imagePath)
              this.role=this.admin.role;  }) ;
     }
     else{
       if(this.test.role === "Admin Digital Manager"){
        this.roleDigital=this.test.role  , 
        this.username = localStorage.getItem("nameAdmin");
        //console.log(parseInt(localStorage.getItem('idAdmin')))
        //console.log(localStorage.getItem("nameAdmin"))
        this.service.getAdminDigitall(parseInt(localStorage.getItem('idAdmin'))).subscribe(data=>{
          this.admin=data
                if(this.admin.image ==null){
                  this.imagePath="./assets/imagesD/faces/user.jpg"
                }
                else{
                this.retrieveResponse = this.admin;
                this.base64Data = this.retrieveResponse.image;
                this.imagePath = 'data:image/jpeg;base64,' + this.base64Data; }
               // console.log(this.imagePath)
                this.role=this.admin.role;  }) ;
       }
     }
    })

    /***** */
    $('.counter').each(function() {
      var $this = $(this),
          countTo = $this.attr('data-count');
      
      $({countNum: $this.text()}).animate({
        countNum: countTo
      },
    
      {
    
        duration: 3000,
        easing:'linear',
        step: function() {
          $this.text(Math.floor(parseInt(this.countNum)));
        },
        complete: function() {
          $this.text(this.countNum);
          //alert('finished');
        }
    
      });  
      
      
    
    }); 
    /**** chart ****/
    var chartDom = document.getElementById('main');
    var myChart = echarts.init(chartDom, 'dark');
    var option;
    
    option = {
      backgroundColor:'rgb(25,28,36)',
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'cross'
        }
      },
      legend: {
        data: ['Patients', 'Age Patients']
      },
      toolbox: {
        feature: {
          magicType: { show: true, type: ['line', 'bar'] },
          restore: { show: true },
          saveAsImage: { show: true }
        }
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      xAxis: [
        {
          type: 'category',
          boundaryGap: false,
          data: [
            'Jan',
            'Fiv',
            'Mar',
            'Avr',
            'Mai',
            'Juin',
            'Juil',
            'Aout',
            'Sept',
            'Oct',
            'Nov',
            'Dec'
          ]
        }
      ],
      yAxis: [
        {
          type: 'value'
        }
      ],
      series: [
        {
          name: 'Patients',
          type: 'line',
          color:'	#6495ED',
         // stack: 'Total',
          areaStyle: {},
          emphasis: {
            focus: 'series'
          },
          data: [this.patients1, this.patients2, this.patients3, this.patients4,
                 this.patients5, this.patients6, this.patients7, this.patients8,
                 this.patients9, this.patients10, this.patients11, this.patients12],
          markPoint: {
            data: [
              { type: 'max', name: 'Max' },
              { type: 'min', name: 'Min' }
            ]
          },
        },
        {
          name: 'Age Patients',
          type: 'line',
          color:'#DDA0DD	',
         // stack: 'Total',
          areaStyle: {},
          emphasis: {
            focus: 'series'
          },
          data: [50, 11, 15, 26, 20, 10, 15, 20, 36, 40, 50, 20]
        }
      ]
    };
    
    option && myChart.setOption(option);
  })  })  })  })  })  })  })  })  })  })  })  }) 
    
    /*type EChartsOption = echarts.EChartsOption;

    var chartDom = document.getElementById('main')!;
    var myChart = echarts.init(chartDom, 'dark');
    var option: EChartsOption;
    
    option = {
      backgroundColor:'rgb(25,28,36)',
      title: {

      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'cross',
          label: {
            backgroundColor: '#6a7985'
          }
        }
      },
      legend: {
        data: ['Patients', 'Age Patient']
      },
      toolbox: {
        show : true,
        feature : {
            mark : {show: true},
            //dataView : {readOnly:false},
            magicType : {show: true, type: ['line', 'bar'/*, 'stack'*//*]},
            restore : {show: true},
            saveAsImage : {show: true}
        }
    },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      xAxis: [
        {
          type: 'category',
          boundaryGap: false,
          data: ['Janv.', 'Févr.', 'Mars', 'Avril', 'Mai', 'Juin', 'Juil.', 'Août', 'Sept.', 'Oct.', 'Nov.', 'Déc.']
        }
      ],
      yAxis: [
        {
          type: 'value'
        }
      ],
      series: [

        
        {
          name: 'Patients',
          type: 'line',
          stack: 'Total',
          areaStyle: {},
          emphasis: {
            focus: 'series'
          },
          data: [100, 258, 181, 230, 188, 127,150, 256, 151, 200, 106, 198]
        },
         
        {
          name: 'Age Patient',
          type: 'line',
          stack: 'Total',
          areaStyle: {},
          emphasis: {
           focus: 'series'
          },
          data: [15, 20, 25, 30,35,40,45,50,55,60,65,70]
        }
        
      ]
    };
    */

} 
logout() {
  localStorage.removeItem('nameAdmin');
  localStorage.removeItem('role');
  localStorage.removeItem('emailAdmin');
  localStorage.removeItem('idAdmin');
  this.service.islogin = false;
  this.router.navigate(['']);
  window.localStorage.clear();
    //location.reload();
}

getNumPatientsToDay(){

  this.patientService.getAllPatientsByDateInscription().subscribe(data=>{
  this.patientToDaycount =data;
  $({ countNum: $('.patient').html() }).animate({ countNum: this.patientToDaycount }, {
    duration: 500,
    easing: 'linear',
    step: function () {
    $('.patient').html(Math.floor(+this.countNum) + "");
},
complete: function () {
    $('.patient').html(this.countNum + "");
    //alert('finished');
}
});
})
}

getAllDemandesAvisEnvoyesAujourdhui(){

  this.avisService.getAllDemandesLastVersion().subscribe(parms=>{
  this.lengthAllDemandesEnvoyesAujourdhui=parms ; 
  $({ countNum: $('.alldemande').html() }).animate({ countNum: this.lengthAllPatientsAujourdhui }, {
    duration: 500,
    easing: 'linear',
    step: function () {
    $('.alldemande').html(Math.floor(+this.countNum) + "");
},
complete: function () {
    $('.alldemande').html(this.countNum + "");
    //alert('finished');
}
});
})
}
/*getAllNbrTelechargement(){
  this.service.getAllDemandesAujordhui().subscribe(parms=>{
  this.lengthAllDemandesEnvoyesAujourdhui=parms ; 
  $({ countNum: $('.nbrTelechargement').html() }).animate({ countNum: this.lengthAllPatientsAujourdhui }, {
    duration: 500,
    easing: 'linear',
    step: function () {
    $('.nbrTelechargement').html(Math.floor(+this.countNum) + "");
},
complete: function () {
    $('.nbrTelechargement').html(this.countNum + "");
    //alert('finished');
}
});
})
}*/
getAllNbrAutoDetections(){
  this.avisService.getAllAutoDetictionToDay().subscribe(parms=>{
  this.autoDetectionToDay=parms ; 
  $({ countNum: $('.detection').html() }).animate({ countNum: this.autoDetectionToDay }, {
    duration: 500,
    easing: 'linear',
    step: function () {
    $('.detection').html(Math.floor(+this.countNum) + "");
},
complete: function () {
    $('.detection').html(this.countNum + "");
    //alert('finished');
}
});
})
}
getAllNbrPatientsCeMois(){
  this.patientService.getNbrPatientCeMois().subscribe(parms=>{
  this.nbrPatientsCeMois=parms ; });
}
getAllNbrPatientsCetteAnnee(){
  this.patientService.gtNbrPatientCetteAnnee().subscribe(parms=>{
  this.nbrPatientsCetteAnnee=parms ; });
}
getAllNbrPatientsCetteSemaine(){
  this.patientService.gtNbrPatientCetteSemaine().subscribe(parms=>{
  this.nbrPatientsCetteSemaine=parms ; });
}

}


