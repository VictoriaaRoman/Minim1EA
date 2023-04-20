import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ID, Localizacion } from 'src/app/interfaces/localizacion';
import { LocalizacionService } from 'src/app/services/localizacion.service';

@Component({
  selector: 'app-list-localizacion',
  templateUrl: './list-localizacion.component.html',
  styleUrls: ['./list-localizacion.component.css']
})
export class ListLocalizacionComponent {
  listLocalizaciones: Localizacion[] = [];
  loading: boolean = false;
  idLocalizacion: string;

  constructor(private _localizacionService: LocalizacionService,
    private toastr: ToastrService,
    private aRouter: ActivatedRoute) {
    this.idLocalizacion = aRouter.snapshot.paramMap.get("idLocalizacion")!;
  }

  ngOnInit(): void {
    if (this.idLocalizacion != null) {
      this.getTicketLocalizacion(this.idLocalizacion);
    }else{
      this.getListLocalizaciones()
    }
    
  }

  getListLocalizaciones() {
    this.loading = true;
    this._localizacionService.getListLocalizaciones().subscribe((data: Localizacion[]) => {
      this.listLocalizaciones = data;
      this.loading = false;
    })
  }

  deleteLocalizacion(id: ID) {
    this.loading = true;
    this._localizacionService.deleteLocalizacion(id).subscribe(() => {
      //this.loading=false;
      if (this.idLocalizacion != null) {
        this.getTicketLocalizacion(this.idLocalizacion);
      }else{
        this.getListLocalizaciones()
      }
      this.toastr.warning('El producto fue eliminado con exito', 'Producto eliminado');
    });
  }

  getTicketLocalizacion(id:string) {
    this.loading = true;
    this._localizacionService.getTicketLocalizacion(id).subscribe((data: Localizacion[]) => {
      this.listLocalizaciones = data;
      this.loading = false;
    })
  }

}
