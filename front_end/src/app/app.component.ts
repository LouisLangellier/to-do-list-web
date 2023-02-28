import { Component } from '@angular/core';
import { AuthService } from 'src/services/auth.service';


interface SideNavToggle {
  screenWidth: number;
  collapsed: boolean;
}
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  title = "To Do List"

  isSideNavCollapsed = false;
  screenWidth = 0;

  constructor(private auth: AuthService) {

  }

  onToggleSideNav(data: SideNavToggle) {
    this.screenWidth = data.screenWidth;
    this.isSideNavCollapsed = data.collapsed;
  }

  isConnected(){
    return this.auth.getIsConnected()
  }
  
}
