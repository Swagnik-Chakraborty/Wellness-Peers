
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { PatientService } from 'src/app/services/patient.service';

@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.scss']
})
export class PatientComponent implements AfterViewInit {
  displayedColumns: string[] = ['SUBJECT_ID', 'HADM_ID', 'Riskgroup', 'AGE','GENDER','actions'];
  gridColumns = 3;
  allpatientData!:any;
  dataSource!:any;

  constructor(private _liveAnnouncer: LiveAnnouncer, private patientService:PatientService) {}

  @ViewChild(MatSort) sort: MatSort | undefined;
  @ViewChild(MatPaginator) paginator: MatPaginator  | undefined;

  ngOnInit() {
    this.patientService.getAllPatientData().subscribe((res)=>{
      this.allpatientData=res;
      this.dataSource = new MatTableDataSource(this.allpatientData);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })

  }

  ngAfterViewInit() {

  }

  toggleGridColumns() {
    this.gridColumns = this.gridColumns === 3 ? 4 : 3;
  }
  onButtonClick(rowData: any) {
    // Do something with the row data
  }

  /** Announce the change in sort state for assistive technology. */
  announceSortChange(sortState: Sort) {
    // This example uses English messages. If your application supports
    // multiple language, you would internationalize these strings.
    // Furthermore, you can customize the message to add additional
    // details about the values being sorted.
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }
}

