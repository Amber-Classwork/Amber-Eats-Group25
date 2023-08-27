import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DataService } from '../../Services/data.service';
import { UserCreationComponent } from '../../Components/user-creation/user-creation.component';
import { UserService } from '../../Services/user.service';
import { CartService } from '../../Services/cart.service';
import { CartItem } from '../../interfaces/cartItem';
import { SidesInterface } from 'src/app/interfaces/sides';

@Component({
  selector: 'app-order-cart',
  templateUrl: './order-cart.component.html',
  styleUrls: ['./order-cart.component.css'],
})
export class OrderCartComponent implements OnInit {
   
  cartItems: CartItem[] = [];
  sides: SidesInterface[] = [];
  
  constructor(
    private router: Router,
    public dialog: MatDialog,
    private dataService: DataService,
    private userService: UserService,
    public cartService: CartService
  ) {}

  updateQuantity(cartID:number, value:number){
    this.cartService.updateCartItemQuantity(cartID, value);

    this.cartItems = this.cartService.getCart();

  }
  formatLabel(value: number) {
    if (value >= 8) {
      return Math.round(value / 7);
    }
    return value;
  }
  goBack(){
    window.history.back();
  }

  checkCartBeforeCheckout(){
    if(this.cartItems.length == 0){
      alert("Please add items to your cart before checkout");
    }else{
      this.router.navigateByUrl("/checkout");
    }
  }

  removeItem(id:number){
    this.cartService.removeCartItem(id);
    this.cartItems = this.cartService.getCart();
  }

  increaseQty(item:CartItem){
      this.cartService.updateCartItemQuantity(item.id,++item.quantity);
  }


  decreaseQty(item:CartItem){
    if(item.quantity-1 == 0){
      return this.removeItem(item.id);
    }
    this.cartService.updateCartItemQuantity(item.id,--item.quantity);
  }

 
  ngOnInit() {
    this.cartItems = this.cartService.getCart();
    this.dataService.getAllSides().subscribe((data)=>{
      this.sides = data;
    });
    this.cartService.updateCart(this.cartItems);

  }



  // Clear Cart
  clearItems() {
    this.cartService.clearCart();
  }
}
