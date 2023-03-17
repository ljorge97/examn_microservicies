import { Controller, Post, Body, Get, Put, Delete, Param } from '@nestjs/common';
import { ClienteProxyVuelos9 } from '../common/proxy/client.proxy';
import { PassengerDTO } from './dto/passenger.dto';
import { Observable } from 'rxjs';
import { IPassenger } from '../common/interface/passenger.interface';
import { PassengerMSG } from '../common/constantes';
import { ApiTags } from '@nestjs/swagger';
@ApiTags("Pasageros")
@Controller('api/v2/passanger')
export class PassangerController {
    constructor(private readonly clienteProxy:ClienteProxyVuelos9){}
    private _clienteProxyPassenger = this.clienteProxy.clienteProxyPassenger();

    @Post()
    insertar(@Body() passengeDTO:PassengerDTO):Observable<IPassenger>{
        return this._clienteProxyPassenger.send(PassengerMSG.INSERTAR,passengeDTO);
    }
    @Get()
    todos():Observable<IPassenger[]>{
        return this._clienteProxyPassenger.send(PassengerMSG.TODOS,'');
    }
    @Get(":id")
    uno(@Param('id') id:string):Observable<IPassenger>{
        return this._clienteProxyPassenger.send(PassengerMSG.UNO,id);
    }
    @Put(":id")
    actualizar(@Param("id") id:string, @Body() passengeDTO:PassengerDTO):Observable<IPassenger>{
        return this._clienteProxyPassenger.send(PassengerMSG.ACTUALIZAR,{id, passengeDTO});
    }
    @Delete(":id")
    eleiminar(@Param("id") id:string):Observable<any>{
        return this._clienteProxyPassenger.send(PassengerMSG.ELIMINAR,id);
    }

}
