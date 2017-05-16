/**
 * Created by AKuzmanoski on 20/12/2016.
 */
import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {Module} from "./module";
@Injectable()
export class ModuleService {
  private _modules: Module[] = [
    {
      "title": "iDeal - world full of ideas and ideal deals",
      "description": "This is the place where your ideas can be properly evaluated, incubated and sold. " +
      "You are free to make your own deals and decisions. The ideas that you save are visible only to you, unless you decide otherwise.",
      "action": {
        name: "Learn more",
        url: "/about",
      },
      "image": {
        "src": "/assets/images/new-idea.png",
        "rowSpan": 1,
        "colSpan": 1
      }
    },
    {
      "title": "Keep your ideas secure and accessible",
      "description": "When you get new idea, write it down with our iDeal editor. iDeal guides you in writing " +
      "structured and comprehensive ideas. Your ideas will be accessible from everywhere and in the same time " +
      "private and secure.",
      "action": {
        name: "Start writing",
        url: "/ideas/new",
      },
      "image": {
        "src": "/assets/images/accessible-idea.png",
        "rowSpan": 1,
        "colSpan": 1
      }
    },
    {
      "title": "Keep track of your problems and share them",
      "description": "Every idea is solution for one or more problems. iDeal gives you the ability " +
      "to keep track of your problems and even share them with the iDeal community.",
      "action": {
        name: "Start writing",
        url: "/problems/new",
      },
      "image": {
        "src": "/assets/images/new-problem.png",
        "rowSpan": 1,
        "colSpan": 1
      }
    },
    {
      "title": "Find ideas that matter to you",
      "description": "If you are interested in finding new and innovative ideas from your domain, explore " +
      "what our community has to offer.",
      "action": {
        name: "Explore ideas",
        url: "/announcements/feed/ideas",
      },
      "image": {
        "src": "/assets/images/find-idea.png",
        "rowSpan": 1,
        "colSpan": 1
      }
    },
    {
      "title": "If you are problem solver, this is the right place for you",
      "description": "If you are hard worker and innovative person you can try to solve problems from other iDeal " +
      "community members. After solving the problem you can offer your solution and earn some money.",
      "action": {
        name: "Start solving",
        url: "/announcements/feed/problems",
      },
      "image": {
        "src": "/assets/images/new-solution.png",
        "rowSpan": 1,
        "colSpan": 1
      }
    }
  ];

  constructor() {

  }

  public get modules(): Observable<Module[]> {
    return Observable.of(this._modules);
  }
}
