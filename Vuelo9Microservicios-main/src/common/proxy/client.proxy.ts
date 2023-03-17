import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { ClientProxy, ClientProxyFactory, Transport } from "@nestjs/microservices";
import { RabbitMQ } from "../constantes";

@Injectable()
export class ClienteProxyVuelos9{
    constructor(private readonly config:ConfigService){}

    clienteProxyUsuarios():ClientProxy{
        return ClientProxyFactory.create({
            transport: Transport.RMQ,
            options:{
                urls:this.config.get('AMQP_URL'),
                queue: RabbitMQ.UserQueue,
            },
        })
    }
    clienteProxyPassenger():ClientProxy{
        return ClientProxyFactory.create({
            transport:Transport.RMQ,
            options:{
                urls:this.config.get('AMQP_URL'),
                queue:RabbitMQ.PassengerQueue,
            }
        });
    }
    clienteProxyFLIGHT():ClientProxy{
        return ClientProxyFactory.create({
            transport:Transport.RMQ,
            options:{
                urls:this.config.get('AMQP_URL'),
                queue:RabbitMQ.FlightQueue,
            }
        });
    }
}