class UI {
  constructor() {
    this.budgetFeedback = document.querySelector(".budget-feedback");
    this.expenseFeedback = document.querySelector(".expense-feedback");
    this.budgetForm = document.getElementById("budget-form");
    this.budgetInput = document.getElementById("budget-input");
    this.budgetAmount = document.getElementById("budget-amount");
    this.expenseAmount = document.getElementById("expense-amount");
    this.balance = document.getElementById("balance");
    this.balanceAmount = document.getElementById("balance-amount");
    this.expenseForm = document.getElementById("expense-form");
    this.expenseInput = document.getElementById("expense-input");
    this.amountInput = document.getElementById("amount-input");
    this.expenseList = document.getElementById("expense-list");
    this.itemList = [];
    this.itemID = 0;
  }



submitBudgetForm(){
  const value = this.budgetInput.value;
  if(value==="" || value <0){
    this.budgetFeedback.classList.add('showItem');
    this.budgetFeedback.innerHTML = `<p>value can not be empty or negative</p>`
    const self = this;

    setTimeout(function(){
      self.budgetFeedback.classList.remove("showItem");
    }, 4000);
    }
    else{
      this.budgetAmount.textContent = value;
      this.budgetInput.value = '';
      this.showBalance();
    }
  }
  showBalance(){
   const expense = this.totalExpense();
   const total = parseInt(this.budgetAmount.textContent) - expense;
   this.balanceAmount.textContent = total;
   if(total < 0){
     this.balance.classList.remove('showGreen', 'showBlack');
     this.balance.classList.add("showRed");
   }
   else if(total === 0){
    this.balance.classList.remove('showGreen', 'showRed');
    this.balance.classList.add("showBlack");
   }
   else if(total > 0){
    this.balance.classList.remove('showBlack', 'showRed');
    this.balance.classList.add("showGreen");
   }
  }

  submitExpenseForm(){
    const expenseValue = this.expenseInput.value;
    const amountValue = this.amountInput.value;
  //   localStorage.setItem("saved", this.expenseInput.value);
  //   console.log(expenseValue)
  // JSON.parse(localStorage.getItem(expenseValue));
  // this.expenseValue.push(newItemList);
    if (expenseValue === "" || amountValue ==="" || amountValue < 0)
    {
      this.expenseFeedback.classList.add('showItem');
      this.expenseFeedback.innerHTML = `<p>value can not be empty or negative</p>`
      const self = this;
      setTimeout(function(){
        self.expenseFeedback.classList.remove("showItem");
      }, 4000);
      
    }
    else{
      let amount = parseInt(amountValue);
      this.expenseInput.value = "";
      this.amountInput.value = "";
     
      
      let expense = {
        id:this.itemID,
        title:expenseValue,
        amount:amount,
      }
      this.itemID++;

 // saving
 let expenseStr = JSON.stringify(expense)
 localStorage.setItem("saved", expenseStr);
// let expensesArr = localStorage.getItem(expenseStr)
let expenses = JSON.parse(localStorage.getItem("saved"));
console.log(expenses);

      // this.itemID++;
      this.itemList.push(expenses);
      this.addExpense(expenses);
      this.showBalance();
      
     
  
    }
  }

  addExpense(expense){
    const div = document.createElement('div');
    div.classList.add('expense');
    div.innerHTML = `
    <div class="expense">
        <div class="expense-item d-flex justify-content-between align-items-baseline">

         <h6 class="expense-title mb-0 text-uppercase list-item">${expense.title}</h6>
         <h5 class="expense-amount mb-0 list-item">${expense.amount}</h5>

         <div class="expense-icons list-item">

          <a href="#" class="edit-icon mx-2" data-id="${expense.id}">
           <i class="fas fa-edit"></i>
          </a>
          <a href="#" class="delete-icon" data-id="${expense.id}">
           <i class="fas fa-trash"></i>
          </a>
         </div>
        </div>
       </div>
       `;
          this.expenseList.appendChild(div);
  }

  totalExpense(){
    let total = 0;
    if(this.itemList.length>0){
      total = this.itemList.reduce(function(acc,curr){
        acc +=curr.amount
        return acc;
      },0)
    }
    this.expenseAmount.textContent = total;
    return total;
  }
  
  editExpense(element){
    let id = parseInt(element.dataset.id);
    let parent = element.parentElement.parentElement.parentElement.parentElement;
    this.expenseList.removeChild(parent);
    console.log(parent)
    let expense = this.itemList.filter(function(item){
      return item.id === id;
      
    })

    this.expenseInput.value = expense[0].title;
    this.amountInput.value = expense[0].amount;
    
    let tempList = this.itemList.filter(function(item){
      return item.id !== id
    })
    this.itemList = tempList;
    this.showBalance()
  }
  deleteExpense(element){
    let id = parseInt(element.dataset.id);
    let parent = element.parentElement.parentElement.parentElement.parentElement;
    this.expenseList.removeChild(parent);
    let tempList = this.itemList.filter(function(item){
      return item.id !== id
    })
    this.itemList = tempList;
    this.showBalance()
  }

// save(element){
//   let list = this.itemList;
//   let tempList = this.itemList.filter(function(item){
//     return item
//   })
//   console.log(this.expenseAmount)
  //console.log(list);
  // let savedList = localStorage.setItem("saved", JSON.parse(list));
  // console.log(savedList);
  // let newItemList = JSON.parse(localStorage.getItem(savedList));
  // newItemList.push();
  
}
// }

// function save(){
//   saveUI = new UI()
//     saveUI.save();
  // console.log(saveUI.itemList)
  // const save = document.getElementById('save');
  // let savedList = localStorage.setItem("saved", this.itemList)
  // let newItemList = JSON.parse(localStorage.getItem(savedList));
  //  newItemList.push();
  // console.log(saveUI.itemList)
// }


function eventlisteners(){
  const budgetForm = document.getElementById("budget-form");
  const expenseForm = document.getElementById("expense-form");
  const expenseList = document.getElementById("expense-list");
  // const save = document.getElementById('save');

  const ui = new UI()
  

  // save.addEventListener('click', function(event){
  //   if(event.target.parentElement.classList.contains('saver')){
  //     ui.save(event.target.parentElement)
  //   }
  //   else{
  //     console.log("error");
  //   }
  // })

  budgetForm.addEventListener('submit', function(event){
    event.preventDefault();
    ui.submitBudgetForm();
  })

  expenseForm.addEventListener('submit', function(event){
    event.preventDefault();
    ui.submitExpenseForm();
  })

  expenseList.addEventListener('click', function(event){
    if(event.target.parentElement.classList.contains('edit-icon')){
      ui.editExpense(event.target.parentElement)
    }
    else if(event.target.parentElement.classList.contains('delete-icon')){
      ui.deleteExpense(event.target.parentElement)
    }
  })
}
document.addEventListener("DOMContentLoaded", function(){
  eventlisteners();
})


