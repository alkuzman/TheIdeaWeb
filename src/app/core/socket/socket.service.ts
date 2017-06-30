/**
 * Created by AKuzmanoski on 31/01/2017.
 */
import {Injectable, OnDestroy, OnInit} from "@angular/core";
import {STOMPService} from "./stopm.service";
import {JwtSecurityContext} from "../authentication/jwt/jwt-security-context.service";
import {ConfigService} from "../config/config.service";
import {Frame, Message} from "stompjs";
import {Observable, Subject} from "rxjs";
import {StompConfig} from "./stomp.config";
import {JwtAuthenticationService} from "../authentication/jwt/jwt-authentication.service";
import {Notice} from "../../domain/model/sharing/notice";
@Injectable()
export class SocketService implements OnInit, OnDestroy {
    private config: StompConfig;
    private first: boolean = true;
    private configured: boolean = false;
    private messages: Observable<Message>;
    private noticeMessage: Subject<Notice> = new Subject<Notice>();
    private noticeCountMessage: Subject<number> = new Subject<number>();

    constructor(private stomp: STOMPService, private securityContext: JwtSecurityContext, private configService: ConfigService, private authenticationService: JwtAuthenticationService) {
        configService.getConfig('/assets/socket/config.json').subscribe(
            (config: StompConfig) => {
                // ... then pass it to (and connect) STOMP:
                this.config = config;
                let token: string = this.securityContext.accessToken;
                if (!this.securityContext.isValid(token))
                    token = "";
                this.config.user = this.formToken(token);
                this.stomp.configure(config);
                this.configured = true;
                this.stomp.try_connect().then(this.on_connect);
            }
        );

        securityContext.accessTokenObservable().subscribe((token: string) => {
            if (this.first || !this.configured) {
                this.first = false;
                return;
            }
            this.stomp.disconnect(() => {
                this.config.user = this.formToken(token);
                this.stomp.try_connect().then(this.on_connect);
            });
        });
    }

    public newNoticeMessage(): Observable<any> {
        return this.noticeMessage.asObservable();
    }

    public newNoticeCountMessage(): Observable<any> {
        return this.noticeCountMessage.asObservable();
    }

    ngOnInit(): void {

    }


    ngOnDestroy(): void {
        this.stomp.disconnect(() => {
        });
    }

    private formToken(token: string) {
        let fullToken = "";
        if (token)
            fullToken = "Bearer " + token;
        return fullToken;
    }

    public on_connect = () => {

        // Store local reference to Observable
        // for use with template ( | async )
        this.messages = this.stomp.messages;

        // Subscribe a function to be run on_next message
        this.messages.subscribe(this.on_next);
    };

    public sendMessage(message: string) {
        this.stomp.publish(message);
    }

    public on_next = (message: any) => {
        // Log it to the console
        if (message.headers.destination === "/user/topic/notices") {
            this.noticeMessage.next(JSON.parse(message.body));
        } else if (message.headers.destination === "/user/topic/notices/count") {
            this.noticeCountMessage.next(JSON.parse(message.body));
        }
    }
}
