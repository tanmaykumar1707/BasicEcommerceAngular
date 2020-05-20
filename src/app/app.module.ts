import { OrderListService } from './services/order-list.service';
import { OrdersService } from './services/orders.service';
import { ShoppingCartService } from './services/shopping-cart.service';
import { CategoryServiceService } from './services/category-service.service';
import { AdminAuthGuardService } from './services/admin-auth-guard.service';
import { UserService } from './services/user.service';
import { AuthGuardService } from './services/auth-guard.service';
import { AuthService } from './services/auth.service';
import { LoginComponent } from './login/login.component';
import { RouterModule, CanActivate } from '@angular/router';
import { environment } from './../environments/environment';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

//added
import {AngularFireModule} from '@angular/fire';
import {AngularFireDatabaseModule} from '@angular/fire/database';
import {AngularFireAuthModule} from '@angular/fire/auth'



import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BsNavbarComponent } from './bs-navbar/bs-navbar.component';
import { HomeComponent } from './home/home.component';
import { ProductsComponent } from './products/products.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { CheckOutComponent } from './check-out/check-out.component';
import { OrderSuccessComponent } from './order-success/order-success.component';
import { MyOrdersComponent } from './my-orders/my-orders.component';
import { AdminProductsComponent } from './admin/admin-products/admin-products.component';
import { AdminOrdersComponent } from './admin/admin-orders/admin-orders.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ProductFormComponent } from './admin/product-form/product-form.component';
import { FormsModule } from '@angular/forms';
import {CustomFormsModule} from 'ng2-validation';
import { ProductFilterComponent } from './products/product-filter/product-filter.component';
import { ProductCardComponent } from './product-card/product-card.component';
import { ProductQuantityComponent } from './product-quantity/product-quantity.component';
import { CartSummaryComponent } from './cart-summary/cart-summary.component';

@NgModule({
  declarations: [
    AppComponent,
    BsNavbarComponent,
    HomeComponent,
    ProductsComponent,
    ShoppingCartComponent,
    CheckOutComponent,
    OrderSuccessComponent,
    MyOrdersComponent,
    AdminProductsComponent,
    AdminOrdersComponent,
    ProductFormComponent,
    ProductFilterComponent,
    ProductCardComponent,
    ProductQuantityComponent,
    CartSummaryComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    //added
    CustomFormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    NgbModule,
    RouterModule.forRoot([
      { path: '', component:ProductsComponent },
      { path: 'products', component:ProductsComponent },
      { path: 'shopping-cart', component:ShoppingCartComponent },
      { path: 'login', component:LoginComponent },

      { path: 'check-out', component:CheckOutComponent, canActivate: [AuthGuardService] },
      { path: 'order-success/:id', component:OrderSuccessComponent, canActivate: [AuthGuardService] },
      { path: 'my/orders', component:MyOrdersComponent, canActivate: [AuthGuardService] },
     
      

      { path: 'admin/products/new', component:ProductFormComponent, 
        canActivate: [AuthGuardService,AdminAuthGuardService] },

        { path: 'admin/products/:id', component:ProductFormComponent, 
        canActivate: [AuthGuardService,AdminAuthGuardService] },

        { path: 'admin/products', component:AdminProductsComponent, 
        canActivate: [AuthGuardService,AdminAuthGuardService] },

        { path: 'admin/orders', component:AdminOrdersComponent, 
        canActivate: [AuthGuardService,AdminAuthGuardService] }

    ]),
    NgbModule
  ],
  providers: [
    AuthService,
    AuthGuardService,
    UserService,
    AdminAuthGuardService,
    CategoryServiceService,
    ShoppingCartService,
    OrdersService,
    OrderListService
  
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
