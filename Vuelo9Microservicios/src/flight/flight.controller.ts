import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ClienteProxyVuelos9 } from '../common/proxy/client.proxy';
import { Observable } from 'rxjs';
import { FlightDTO } from './dto/flight.dto';
import { FlightMSG, PassengerMSG } from '../common/constantes';
import { IFlight } from 'src/common/interface/flight.interface';
import { ApiTags } from '@nestjs/swagger';

@ApiTags("Vuelos")
@Controller('api/v2/flight')
export class FlightController {
  constructor(private readonly clienteProxy: ClienteProxyVuelos9) {}
  private _clientProxyFlight = this.clienteProxy.clienteProxyFLIGHT();
  private _clienteProxyPassenger = this.clienteProxy.clienteProxyPassenger();

  @Post()
  insertar(@Body() flightDTO: FlightDTO): Observable<IFlight> {
    return this._clientProxyFlight.send(FlightMSG.INSERTAR, flightDTO);
  }
  @Get()
  todos(): Observable<IFlight[]> {
    return this._clientProxyFlight.send(FlightMSG.TODOS, '');
  }
  @Get(':id')
  uno(@Param('id') id: string): Observable<IFlight> {
    return this._clientProxyFlight.send(FlightMSG.UNO, id);
  }
  @Put(':id')
  actualizar(
    @Param('id') id: string,
    @Body() flightDTO: FlightDTO,
  ): Observable<IFlight> {
    return this._clientProxyFlight.send(FlightMSG.ACTUALIZAR, {
      id,
      flightDTO,
    });
  }
  @Delete(':id')
  eleiminar(@Param('id') id: string): Observable<any> {
    return this._clientProxyFlight.send(FlightMSG.ELIMINAR, id);
  }
  @Post(':flightId/passenger/:passengerId')
  async AgregarPasagero(
    @Param('flightId') flightId: string,
    @Param('passengerId') passengerId: string,
  ) {
    const passenger = await this._clienteProxyPassenger.send(
      PassengerMSG.UNO,
      passengerId,
    );
    if (!passenger) {
      throw new HttpException('El pasagero no exite', HttpStatus.NOT_FOUND);
    }
    return this._clientProxyFlight.send(FlightMSG.AGREGAR_PASAGERO, {
      flightId,
      passengerId,
    });
  }
}
