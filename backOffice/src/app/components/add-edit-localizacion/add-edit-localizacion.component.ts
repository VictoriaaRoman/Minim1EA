import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ID, Localizacion } from 'src/app/interfaces/localizacion';
import { ListLocalizacionComponent } from '../list-localizacion/list-localizacion.component';
import { LocalizacionService } from 'src/app/services/localizacion.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Ticket } from 'src/app/interfaces/ticket';
import { Location } from '@angular/common';

@Component({
  selector: 'app-add-edit-localizacion',
  templateUrl: './add-edit-localizacion.component.html',
  styleUrls: ['./add-edit-localizacion.component.css']
})
export class AddEditLocalizacionComponent {
  formLocalizacion: FormGroup;
  loading: boolean = false;
  idLocalizacion: string;
  idTicket: string;
  operacion: string = 'Añadir ';

  constructor(private fb: FormBuilder,
    private _localizacionService: LocalizacionService,
    private router: Router,
    private toastr: ToastrService,
    private aRouter: ActivatedRoute,
    private _location: Location) {
    this.formLocalizacion = this.fb.group({
      //Para poner mas de una validacion hay que ponerlas entre claudators
      name: ['', Validators.required],
      localizacion: [null, Validators.required],
      veces: [null, Validators.required],
      ticket: [null]
    })
    this.idLocalizacion = aRouter.snapshot.paramMap.get("idLocalizacion")!;
    this.idTicket = aRouter.snapshot.paramMap.get("idTicket")!;
  }
  ngOnInit(): void {
    if (this.idLocalizacion != null) {
      this.operacion = 'Actualizar ';
      this.getLocalizacion(this.idLocalizacion);
    }
  }

  goBack(){
    this._location.back();
  }


  addLocalizacion() {
    const localizacion: Localizacion = {
      name: this.formLocalizacion.value.name,
      localizacion: this.formLocalizacion.value.localizacion,
      veces: this.formLocalizacion.value.veces,
      ticket: this.formLocalizacion.value.ticket,
    }

    this.loading = true;
    if (this.idLocalizacion !== null) {
      //Es update
      this._localizacionService.updateLocalizacion(this.idLocalizacion, localizacion).subscribe(() => {
        this.toastr.info(`La localizacion ${localizacion.name} fue actualizado con exito`, 'Producto actualizado');
        this.loading = false;
        this.router.navigate([`/localizacion`]);
       
      })
    } else {
      //Es crear
      this._localizacionService.crateLocalizacion(localizacion).subscribe((data:Localizacion) => {
        this.toastr.success(`La localizacion ${localizacion.name} fue agregado con exito`, 'Producto agregado')
        this.loading = false;
        this.idLocalizacion=String(data._id!);
        console.log(data);
        
        //Es añadir el producto al ticket
        if (this.idTicket !== null) {
          this._localizacionService.insertTicketTolocalizacion(this.idLocalizacion,this.idTicket).subscribe();
        }
        this.router.navigate([`/localizacion`]);
      })

    }
  }

  getLocalizacion(id: string) {
    this.loading = true;
    this._localizacionService.getLocalizacion(id).subscribe((data: Localizacion) => {
      this.loading = false;
      this.formLocalizacion.patchValue({
        name: data.name,
        localizacion: data.localizacion,
        veces: data.veces,
        ticket: data.ticket,
      })
    })
  }

}
