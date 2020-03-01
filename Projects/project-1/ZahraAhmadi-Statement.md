#### Name: Zahra Ahmadi
#### Date: 02/04/2020
#### Professor: Pippin Barr
#### Project 1 - Sisyphus - Artist Statement

According to my understanding of Sisyphus Myth, Sisyphus has been a cruel Greek king who was punished to
roll immense boulders up a hill and then, watching them down forever. In first sight, this action absolute absurdity 
might be the only thing that can be perceived of this scenario. For sure, nothing could improve or worsen Sisyphus 
situation, if he rolled more or less boulders up the hill or if he did this action faster or slower. But what would lead him 
to go through whole this process every day? 

I would say the false hope that this action might eventually leads to the happening of something positive in his life. He 
might be hopeful that he may finally be forgiven, or doing this action continuously, he might forget all the evil deeds he 
had done before. In a word, it has been this false hope which encouraged him to continue.

This false hope is mainly what I am trying to make the user feels, when he/she is playing my game. The game story is 
about someone whose guests arrive in 20 seconds and he needs to drop all the paper trashes into the trash bin. 
To motivate the player to go through the process of dragging and dropping, I kept the number of trashes limited. 
This way, although the given time is too short and the player sees that, he/she keeps dragging and dropping trashes 
inside the trash bin because he/she feels that “Oh, it’s just a bunch of trashes, for sure I can finish it before time ends!”. 

To program this game, I used HTML, JavaScript and CSS. When I started coding, the first problem I faced with was that  
I didn’t know how to create div elements in my JavaScript file and then append them to the main div I had in HTML file. 
But then, with the help of Dana I found that I need to use a for loop and createElement method to create divs one by one. 
Thereafter, I faced with my second problem when I was trying to use remove function for the paper divs in my onDrop
function. Since I was appending divs with same attribute names to my main div, every time that I dragged and drop one 
of the papers to the trash bin, all the papers instead of the dragged paper disappeared. 

Therefore, I found that I need to make an array of sequential attribute names and assigns them to the divs. This way, 
every time a paper is dropped in the trash bin only that paper is called and removed from the main div. After sorting out 
these two problems, I could proceed my coding and add other required elements to my game, like the timer, start and 
game over screen. 

However, here is the last step I got stuck in. I did not know how to stop my setInterval function and restart the game once 
the player clicked on the button. Thanks to the help I received from Sabine, I found that I need to add the clearInterval 
function to my code in the proper place and call two of the functions containing my paper divs in the if statement which is 
supposed to restart the game.

For this game visual aspect, I got all of my images from internet, as I spent more time on the coding side.
I also got my sound effects from free sound website which its link is available in my JavaScript file.

###### Reference
Background image: (https://photodune.net/item/rustic-wooden-board-texture-table-top-view/18736293)
Wastepaper image: (https://pixabay.com/vectors/wastepaper-discard-trash-paper-97619/)
Trash bin: (https://pnghunter.com/png/recycle-bin-15/)
Sound effects: https://freesound.org/people/DeantheDinosauce/sounds/177853/




