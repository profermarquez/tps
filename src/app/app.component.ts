import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit{
  title = 'tps';
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  
  periodicElement: PeriodicElement[]=[
    {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
    {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
    {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
    {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
    {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
    {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
    {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
    {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
    {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
    {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
    {position: 11, name: 'Sodium', weight: 22.9897, symbol: 'Na'},
    {position: 12, name: 'Magnesium', weight: 24.305, symbol: 'Mg'},
    {position: 13, name: 'Aluminum', weight: 26.9815, symbol: 'Al'},
    {position: 14, name: 'Silicon', weight: 28.0855, symbol: 'Si'},
    {position: 15, name: 'Phosphorus', weight: 30.9738, symbol: 'P'},
    {position: 16, name: 'Sulfur', weight: 32.065, symbol: 'S'},
    {position: 17, name: 'Chlorine', weight: 35.453, symbol: 'Cl'},
    {position: 18, name: 'Argon', weight: 39.948, symbol: 'Ar'},
    {position: 19, name: 'Potassium', weight: 39.0983, symbol: 'K'},
    {position: 20, name: 'Calcium', weight: 40.078, symbol: 'Ca'},
  ];
//sortdata
  sortedData : PeriodicElement[];
  dataSource!:MatTableDataSource<PeriodicElement>;

  constructor()
    {
      //this.dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
      this.sortedData = this.periodicElement.slice();
      this.dataSource= new MatTableDataSource<PeriodicElement>(this.periodicElement);
      this.dataSource.paginator=this.paginator;
      this.dataSource.sort = this.sort;
    }

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  

  ngAfterViewInit() {
      this.dataSource.paginator = this.paginator;
    }

    //sort 
    sortData(sort: Sort) {
      const data = this.periodicElement.slice();
      if (!sort.active || sort.direction === '') {       
        return;
      } 
  
       this.sortedData = data.sort((a, b) => {
        const isAsc = sort.direction === 'asc';
        switch (sort.active) {
          case "position":
            return this.compare(a.position, b.position, isAsc);
          case "name":
            return this.compare(a.name, b.name, isAsc);
  
          default:
            
            
            return 0;
        }
      }); 
      this.dataSource = new MatTableDataSource<PeriodicElement>(this.sortedData);
      this.dataSource.paginator=this.paginator;
    }
  
   compare(a: Number | Date | string, b: Number | Date | string, isAsc: boolean)
  {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  } 
}

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}