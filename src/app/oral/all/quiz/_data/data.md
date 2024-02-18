# Domande orali

<!-- Generali -->
## Resident monitor

> Dato che la memoria era limitata, un software che si occupava di gestire il nastro e metterlo nella memoria disponibile.
> Una volta caricato il programma, si occupava di eseguirlo effettuando una jump alla prima istruzione utile.
> Il programma una volta terminato, ridava il controllo al resident monitor facendo una jump alla sua prima istruzione utile.

Veniva utilizzato da MS-DOS, il nome deriva da un **programma** che è **sempre presente nella memoria di un sistema** (per questo resident).

Poiché la memoria era limitata, solitamente era poco più di uno stub che prendeva il controllo del sistema alla fine di un job e caricava una porzione non resident per pulire dal job precedente e preparare il sistema per il job successivo.

## Sistema multiprogrammato

Ci sono più processi (job) **contemporaneamente** presenti **in memoria**.

Un sistema multiprogrammato non è per forza timesharing, ma un sistema batch può essere multiprogrammato.

<!-- Processi -->
## PCB --- Per passare dai differenti stati di un processo, quale struttura dati viene utilizzata dal S.O.?

Il sistema operativo mantiene una tabella dei processi, con una voce per processo, contenente i dati relativi al processo *(PC, puntatore allo stack, allocazione della memoria, stato dei file aperti, informazioni sullo scheduling)* detta **Process Control Block** (**PCB**). In realtà mantiene i puntatori ai PCB.

La PCB presenta 3 categorie di dati:

- Process management: tutto ciò che è funzionale per la CPU (*fotografia della CPU dell'ultima volta in cui è stata utilizzata: registri in uso, PC, configurazione dello stato interno, valore dello stack pointer...*)
- Memory management: parametri utili a capire dove sono i dati
  - Text segment: dov’è l’eseguibile
  - Data segment: dove sono i dati
  - Stack segment: dove punta lo stack pointer
- File management: rapporto tra processo e file system
  - Directory principale
  - Directory di lavoro
  - Descrittori dei file

## Cosa succede quando chiamo una system call? (passo per passo)

- Push dei parametri della funzione nello stack (come se fosse una funzione normale)
- Viene chiamata una funzione che è uno **stub** all’interno della libreria: **non è una vera system call** ma una specie di **segnaposto** per una system call equivalente.
- Lo **stub** carica in un **registro** il numero **identificativo** della **system call** e genera una **trap**.
- La **trap** fa passare il **sistema in kernel mode** per poter utilizzare le strutture dati del kernel.
- Si guarda nel registro che system call è stata chiamata.
- Si utilizza l’**identificativo come indice** all’interno di una struttura dati che punta alle istruzioni della system call (*come succede con l’identificativo della periferica che genera l’interrupt che viene usato come indice nell’interrupt vector che contiene i riferimenti alle interrupt service routine*).
- L’**istruzione** puntata viene **eseguita nello spazio del processo**, quindi si utilizza lo stack del processo e i parametri da lui depositati nello stack.
- Quando l’**istruzione** è **terminata** si torna al chiamante (la libreria) in **user mode** e il **controllo** viene ridato al **processo**, che continua l’**esecuzione in user mode**.

## Stati di un processo

Gli stati (semplificati) di un processo sono:

- **Ready** - il processo è pronto per essere eseguito
- **Running** - il processo è in esecuzione
- **Blocked** - il processo è in attesa di un evento (ad esempio I/O)

In particolare, un processo può essere in uno dei seguenti stati:

- **Created** - il processo è stato creato ma non è ancora pronto per essere eseguito
- **Ready to run in memory** - il processo è pronto per essere eseguito e si trova in memoria
- **Ready to run in disk** - il processo è pronto per essere eseguito ma si trova in disco (swap out)
- **Kernel mode** - il processo è in esecuzione in kernel mode
- **User mode** - il processo è in esecuzione in user mode (può passare in kernel mode tramite una system call)
- **Zombie** - il processo è terminato ed è in attesa che le sue risorse vengano riallocate

## Differenza tra processo e thread

I **primi** sono **entità isolate**, mentre i **secondi condividono lo spazio di indirizzamento** ma **ognuno** ha il **suo flusso esecutivo**.

- **Processo**: raggruppamento di risorse relazionate (ogni processo ha uno spazio degli indirizzi contenente testo, programma e dati, così come altre risorse come file aperti, processi figli). Riunendo queste risorse sottoforma di processo, questi possono essere gestiti più facilmente.
- **Thread**: i thread sono **entità schedulate per l’esecuzione** sulla CPU. Ogni thread ha un PC, dei registri contenenti le sue variabili, uno stack. Sebbene debba essere eseguito all’interno di un processo, thread e processo sono due concetti distinti e possono essere trattati separatamente.

I thread **consentono molteplici esecuzioni che hanno luogo nello stesso ambiente del processo, con un alto grado di indipendenza tra l’una e l’altra**.

## Interrupt vs Trap

- **Interrupt** - evento asincrono, arriva dalle periferiche e quindi può arrivare in ogni momento
- **Trap** - istruzione sincrona, ovvero dato che può partire solo durante l'esecuzione è sincrona con gli stati interni della CPU (ad esempio system call per passare in kernel)

## Cos'è un interrupt?

Un interrupt è evento asincrono, di solito arriva dalle periferiche e quindi può arrivare in ogni momento. Può bloccare l'esecuzione attuale per gestirlo (tramite *interrupt handler*).

## Cos'è un trap?

Un trap è un'istruzione sincrona, ovvero dato che può partire solo durante l'esecuzione è sincrona con gli stati interni della CPU (ad esempio system call per passare in kernel).

Oppure può essere un'istruzione che viene eseguita quando si verifica un errore, come una divisione per zero o una page fault.

## Quante trap conosci?

- **Page fault** - quando un processo cerca di accedere a una pagina di memoria che non è in memoria
- **Divide by zero** - quando un processo cerca di dividere per zero
- **Segmentation fault** - quando un processo cerca di accedere a una parte di memoria a cui non ha accesso

## Implementazione dei processi

Riguarda **PCB**, torna indietro.

## Come sono implementati i thread e come vengono usati?

I thread sono implementati in tre modi:

- **Nello spazio utente** - il thread è gestito da una libreria, il kernel non sa nulla dei thread. Ogni processo ha la sua tabella dei thread. Dato che non occorrono cambi di contesto, lo scheduling dei thread è molto più veloce. Ogni processo deve gestire il proprio scheduling.
- **Nel kernel** - il kernel gestisce i thread. Non c'è una tabella dei thread per processo, ma una tabella dei thread per sistema. A differenza dei thread nello spazio utente, la schedulazione non guarda solo i thread di un processo, ma tutti i thread del sistema.
- **Ibridi** - si usano i thread nel kernel, e per ogni thread si può fare multiplexing con i thread nello spazio utente. Il kernel ovviamente vede solo i suoi.

## Come si può creare un processo?

Un processo può essere creato:

1. All'inizializzazione del sistema
2. All'esecuzione di una system call da parte di un altro processo (`fork`, `exec`, `CreateProcess`)
3. Su richiesta dell’utente di creare un nuovo processo (Vedi 2)
4. Inizio di un job in un sistema batch: ma questo viene eseguito da un processo (Vedi 2)

## Quando si fa scheduling?

Si fa scheduling quando:

- Quando un processo viene creato
- Quando un processo termina
- Quando un processo si blocca in I/O, o altro
- Quando si verifica un interrupt di I/O

## Come può terminare un processo?

Un processo può terminare:

- Terminazione volontaria
  - Esplicita - system call `exit`
  - Implicita - fine del main (normal) oppure uscita con un errore (error exit)
- Terminazione involontaria
  - Errore fatale - ad esempio divisione per zero
  - Terminazione da parte di un altro processo - system call `kill`

## Processi CPU bound e I/O bound

CPU bound significa che il processo passa la maggior parte del tempo a fare calcoli, mentre I/O bound significa che il processo passa la maggior parte del tempo in attesa di I/O.

## Chi mi porta in stato di ready? E chi in blocked?

Da running a ready ci pensa lo scheduler.

Da blocked a ready ci pensa l'interrupt, tramite l'interrupt handler.

Da running a blocked succede quando un processo fa una system call per esempio per leggere da disco.

Dallo stato di ready a running e viceversa ci pensa lo scheduler, dallo stato di esecuzione allo stato di bloccato è una system call mentre da bloccato a ready è un interrupt che viene sollevato dal processo in stato di bloccato.

## Cosa succede all'interno del kernel quando arriva un interrupt?

1. Interrupt invia un segnale su una linea del bus

<!-- TODO -->

- Vengono **salvati** tutti i **registri** e si **imposta** un **nuovo contesto** ed un **nuovo stack per l’interrupt service routine**.
- La **periferica che ha generato l’interrupt** invia **sul bus** un **identificativo** che viene utilizzato come **indice** all’interno dell’**interrupt vector**. L’**istruzione puntata** nella posizione indicata è l’**interrupt service routine da eseguire**.
- Viene **eseguita** l’interrupt service routine che **estrae** le **informazioni necessarie dai registri del controller del dispositivo che ha generato l’interrupt**.
- Viene **scelto quale processo va eseguito come successivo** e **si** **imposta il contesto per il nuovo processo**.

## Interrupt preciso

Un interrupt che lascia la macchina in uno stato ben preciso, si chiama interrupt preciso.

- **Interrupt preciso**: quando arriva trova la CPU in uno stato ben preciso:
  - il valore del PC è salvato in un posto conosciuto;
  - tutte le istruzioni prima di quella puntata dal PC sono state eseguite completamente;
  - tutte le istruzioni successive a quella puntata dal PC non sono ancora state eseguite;
  - lo stato di esecuzione dell’istruzione puntata dal PC è noto.
- **Interrupt non preciso**: al suo arrivo trova la CPU con istruzioni disordinate e non eseguite completamente.

<!-- Concurrency -->
## Cos'è la race condition?

La race condition è una situazione in cui due o più processi accedono a una risorsa condivisa e il risultato finale dipende da chi viene prescelto per l'esecuzione.

## Cos'è la regione critica?

La regione critica è una sezione di codice in cui un processo accede a una risorsa condivisa.

## 4 condizioni che devono verificarsi perché sia buona una soluzione per la regione critica

1. Non ci possono essere contemporaneamente due processi all’interno delle proprie regioni critiche
2. Non possono essere fatte assunzioni sul numero e sulla velocità delle CPU
3. Nessun processo al di fuori della regione critica può bloccare altri processi (nell'entrare nella regione critica)
4. Nessun processo dovrebbe aspettare un tempo indefinito per entrare all’interno della sua regione critica (starvation)

## Come si implementa il busy waiting?

Il busy waiting si implementa con un ciclo while che controlla la condizione di entrata nella regione critica.
Spreca tempo di CPU, dato che non fa altro che controllare la condizione di entrata.

## Funzionamento delle variabili di lock

Esiste una variabile condivisa `lock`, inizialmente a 0, che indica se un processo è all'interno della regione critica o meno.

Quando un processo vuole entrare nella regione critica, controlla se `lock` è a 0. Se sì, imposta `lock` a 1 e entra nella regione critica. Altrimenti, aspetta.

Un lock che utilizza busy waiting è chiamato **spinlock**.

## Alternanza stretta

Si ha una variabile `turn` che indica quale processo ha il diritto di entrare nella regione critica.

Quando il processo 0 finisce il suo lavoro, imposta `turn` a 1. Il processo 1 intanto era in busy waiting con un ciclo while.

Non solo spreca tempo di CPU, ma viola anche la condizione 3 delle quattro condizioni per una buona soluzione per la regione critica, dato che un processo al di fuori della regione critica blocca altri processi.

## Che condizione viola l'alternanza stretta?

Viola la terza condizione delle quattro condizioni per una buona soluzione per la regione critica, dato che un processo al di fuori della regione critica blocca altri processi.

## Soluzione di Peterson? (quali sono le variabili che utilizza e a cosa servono)

Invece di avere un'unica variabile `turn`, si usano due variabili: `turn` e `interested`.

`turn` indica quale processo ha il diritto di entrare nella regione critica, mentre `interested` indica se un processo è interessato ad entrare nella regione critica.

Quando un processo vuole entrare nella regione critica, imposta `interested` a `true` e `turn` a se stesso. Poi controlla (tramite busy waiting) che sia il suo turno e che l'altro processo non sia interessato.

Quando termina il suo lavoro, imposta `interested` a `false`.

## TSL

Test and Set Lock. È un'istruzione (hardware, CPU) atomica che legge il valore di una variabile di lock e salva un valore non zero all'indirizzo della variabile. È atomica, perché chiude il bus e non permette ad altri processi di accedere alla memoria.

## Disabilitazione degli interrupt. Disabilitare gli interrupt funziona sui sistemi multiprocessori?

Disabilitando gli interrupt, si evita che un processo venga prelazionato, quindi il controllo della CPU non verrà passato a nessun altro processo, evitando così che due processi accedano contemporaneamente alla regione critica.

Non è consigliato perché se il processo che ha disabilitato gli interrupt va in loop infinito o si dovesse verificare un bug, il sistema operativo non potrà fare nulla e rimarrà bloccato.

Inoltre, su sistemi multiprocessori, disabilitare gli interrupt non funziona, perché vengono disabilitati solo sul processore in cui viene eseguito il processo che gli disabilita. Quindi un altro processo su un altro processore potrebbe accedere alla regione critica.

## Cos'è un semaforo?

Inventato da Dijkstra (in origine contatore di wakeup), è una variabile intera non negativa, su cui si possono fare due operazioni: `down` e `up`. Risolve il problema di perdita `sleep` e `wakeup`.

- `down` - se il semaforo è maggiore di 0, lo decrementa. Altrimenti, il processo va in `sleep` senza eseguire completamente l'operazione.
- `up` - se ci sono processi in `sleep` per quel semaforo, ne sveglia uno. Altrimenti, incrementa il semaforo.

Tutte queste operazioni sono atomiche.

Normalmente queste operazioni si realizzano come chiamate di sistema.

I semafori inizializzati a 1 sono chiamati semafori binari o **mutex**.

## Cos'è un monitor?

Per evitare di sbagliare con i semafori, venne proposta una primitiva di sincronizzazione di livello più alto, chiamata monitor.

È una raccolta di procedure e variabili, raggruppate in una specie di modulo o pacchetto. Sono un costrutto del linguaggio di programmazione, sta al compilatore realizzare la mutua esclusione. (in generale si usa un mutex)

Vengono introdotte delle variabili di condizione, insieme a due operazioni su di esse, `wait` e `signal`. Le variabili condizione non sono contatori. Non accumulano segnali per usarli in seguito, come fanno i semafori. Così, se viene inviato un segnale a una variabile condizione con nessuno in attesa, il segnale è perso per sempre. In altre parole, la wait deve arrivare prima della signal.

## Cos'è il problema del produttore consumatore?

Si ha un **buffer di capacità limitata**, una popolazione di thread che producono informazioni e le inseriscono all'interno del buffer (producer threads) e una popolazione di thread che utilizzano prendono le informazioni dal buffer e le utilizzano, (consumer threads).

**Non è possibile fare assunzioni sulla velocità** con cui i **produttori** creano le informazioni e sulla **velocità con cui i consumatori** utilizzano l'informazione, così come non vengono fatte assunzioni sulla numerosità delle popolazioni.

## Produttore e consumatore con sleep and wakeup

Quando il buffer è pieno, il produttore va in `sleep`. Quando il buffer è vuoto, il consumatore va in `sleep`.

Quando il produttore inserisce un elemento nel buffer, invia un `wakeup` e sveglia un consumatore. Quando il consumatore prende un elemento dal buffer, invia un `wakeup` e sveglia un produttore.

Variabile di `count` condivisa,

## Quanti semafori ha bisogno il problema del produttore consumatore?

- Un mutex per gestire la mutua esclusione (inizializzato a 1)
- Un semaforo per gli elementi occupati del buffer (inizializzato a 0)
- Un semaforo per gli elementi vuoti del buffer (inizializzato a N, dove N è la dimensione del buffer)

<!-- Scheduling -->
## Cos'è il dispatcher?

Il dispatcher è il modulo del sistema operativo che si occupa di passare il controllo della CPU da un processo all'altro. È il modulo che esegue il cambio di contesto.

## Categorie dei sistemi di scheduling

- **Batch** - lo scheduling avviene solo nella scelta del processo successivo a quello appena terminato.
- **Interattivi** - la decisione di scheduling avviene una volta per quanto di tempo. L'obiettivo è rispondere all'utente il più velocemente possibile.
- **Real-time** - il buon funzionamento dipende dal fatto che riesca completare l’esecuzione di un processo entro una certa scadenza. Si suddivide in due categorie:
  - Hard real-time - scadenze assolute
  - Soft real-time - ritardi non desiderati ma tollerabili

## Obiettivi dei sistemi di scheduling (tutti)

- **Equità** - equa condivisione della CPU per ogni processo.
- **Applicazione della policy** - assicurarsi che la policy sia attuata.
- **Bilanciamento** - tenere impegnate tutte le parti del sistema.

## Obiettivi dei sistemi di scheduling (batch)

- **Throughput** - massimizzare il numero di job in un'ora
- **Tempo di turnaround** - ridurre al minimo il tempo dall'inizio di un lavoro alla sua fine
- **Utilizzo della CPU** - mantenere la CPU sempre impegnata

## Obiettivi dei sistemi di scheduling (interattivi)

- **Tempo di risposta** - rispondere alle richieste rapidamnete
- **Adeguatezza** - far fronte alle aspettative dell'utente

## Obiettivi dei sistemi di scheduling (real-time)

- **Rispetto delle scadenze** - evitare perdita di dati
- **Prevedibilità** - evitare il degrado della qualità nei sistemi multimediali

## Quali algoritmi possono essere usati nei sistemi batch?

- **FCFS** - i processi sono assegnati alla CPU nell'ordine in cui arrivano
- **SFJ** - vengono assegnati alla CPU prima i processi con il lavoro minore
- **SFJ con prelazione** (SRTF) - vengono assegnati alla CPU prima i processi con tempo rimanente alla fine minore

## Quali algoritmi possono essere usati nei sistemi interattivi?

- **Round-robin** - quanto di tempo uguale per ogni processo
- **Scheduling a priorità** - vengono assegnati in base alla loro priorità
  - Priorità statica - assegnata alla creazione del processo
  - Priorità dinamica - cambia durante l'esecuzione in base a delle statistiche (ad esempio utilizzo I/O oppure quanto tempo ha effettivamente usato sul totale del quanto assegnato).
    - È conveniente suddividere in classi
- **Scheduling a lotteria** - ogni processo ha dei biglietti, verranno estratti a caso. Al vincitore verrà assegnata la CPU
- **Scheduling garantito** - ogni processo riceverà la stessa quantità di CPU
- **Scheduling fair-share** - a differenza dello scheduling garantito, ogni utente riceverà la stessa quantità di CPU
- **Code multiple** - ci sono delle classi di priorità, la più alta avrà un solo quanto, la seconda due, la terza quattro, e così via. Quando un processo utilizza tutto il suo quanto a disposizione, verrà spostato di una classe in basso.

## Quali algoritmi possono essere usati nei sistemi real-time?

<!-- TODO -->

- **RMS** - Rate Monotonic Scheduling
- **EDS** / **EDFS** - Earliest Deadline First

## RMS

<!-- TODO -->

## EDS / EDFS

<!-- TODO -->

## Differenza tra processo periodico e processo non periodico

<!-- TODO -->

- Processo periodo: avvengono ad intervalli regolari
- Processo non periodico: avvengono imprevedibilmente

## Condizione di schedulabilità (spiegazione)

Un insieme di processi è schedulabile se la somma dei rapporti tra il tempo di CPU (burst) e il periodo di ogni processo è minore o uguale a 1.

$$
\sum_{i=1}^m\left(\frac{C_i}{P_i}\right)\leq 1
$$

## Scheduling Round-robin

Ad ogni processo è assegnato un quanto di tempo, durante il quale è consentito di essere eseguito. Se alla fine del quanto è ancora in esecuzione, la CPU viene prelazionata e assegnata ad un altro processo. Se finisce prima o si blocca, viene fatto uno scambio di CPU. Quando finisce viene messo alla fine dell'elenco.

## Considerazioni sul quanto di tempo nello scheduling Round-robin --- In base a cosa va scelto il quanto di tempo nel Round-robin?

Dato che lo scambio del processo in esecuzione (o scambio di contesto) è un'operazione "lunga", dobbiamo usare un quanto di tempo adeguato.

Ad esempio se consideriamo un tempo di scambio di 1ms, se il quanto è di 4ms sprecheremo il 20% del tempo nel cambiare il processo in esecuzione.
Se invece il quanto è troppo grande, il sistema avrà una risposta scadente alle richieste rapide.

Di solito 20-50ms vanno bene.

## Quali sono i tipi di processi che esistono e quali penalizza il Round-robin?

Possiamo classificare i processi in due tipi, CPU bound e I/O bound.

CPU bound significa che il processo passa la maggior parte del tempo a fare calcoli, mentre I/O bound significa che il processo passa la maggior parte del tempo in attesa di I/O.

Il Round-robin penalizza i processi CPU bound, perché non riescono a completare il loro quanto di tempo e quindi vengono prelazionati.

## Scheduling a priorità

A ciascun processo è assegnata una priorità, e la CPU viene assegnata al processo con la priorità più alta. Per evitare che un processo con priorità alta siano sempre in esecuzione, lo scheduler può abbassare la priorità del processo attualmente in esecuzione ad ogni scatto del clock. In alternativa, a ciascun processo può essere assegnato un quanto di tempo in cui può essere eseguito.

Si suddivide in due categorie:

- **Priorità statica** - assegnata alla creazione del processo
- **Priorità dinamica** - cambia durante l'esecuzione in base a delle statistiche (ad esempio utilizzo I/O oppure quanto tempo ha effettivamente usato sul totale del quanto assegnato).

È spesso conveniente suddividere i processi in classi di priorità, e dentro a ciascuna classe utilizzare lo scheduling Round-robin.

## Scheduling della lotteria

Ogni processo ha dei biglietti. Quando va presa una decisione di scheduling, viene estratto un biglietto a caso. Il processo che ha il biglietto estratto vince e gli verrà assegnata la CPU.

Questo algoritmo è molto flessibile, perché possiamo assegnare più biglietti ai processi che vogliamo favorire.

Inoltre, i processi possono scambiarsi i biglietti.

## Scheduling fair-shared

## Scheduling garantito

## Scheduling a code multiple

## Differenza tra scheduling fair-shared e garantito?

Nel fair-shared, ogni utente riceverà la stessa quantità di CPU, mentre nel garantito, ogni processo riceverà la stessa quantità di CPU.

<!-- Memory -->
## Gestione della memoria libera

- **Bitmap** - ogni unità di allocazione ha un bit associato, 1 se è occupato, 0 se è libero. Il problema è che se la memoria è grande, la bitmap diventa grande. Inoltre, non è efficiente per trovare un blocco di memoria libero.
- **Lista collegata** - una lista di tutti i frame liberi

## Algoritmi per la frammentazione esterna

- **First fit** - cerca la prima locazione libera che soddisfa la richiesta. Lo spazio libero viene suddiviso in due parti, una parte per il processo e una parte che rimane libera.
- **Next fit** - come first fit, ma inizia la ricerca dalla locazione in cui si è fermato l'ultima volta.
- **Best fit** - cerca la locazione libera più piccola che soddisfa la richiesta, evitando di spreacare spazio. Genera anche un maggior spreco di memoria rispetto a first fit e next fit.
- **Worst fit** - cerca la locazione libera più grande che soddisfa la richiesta.
- **Quick fit** - divido gli spazio in base a delle dimensioni comuni.

Problema comune: quando un processo finisce o va in swap, trovare i suoi vicini per vedere se sia possibile unirlo a loro è dispendioso.

## Spazio degli indirizzi

Lo spazio degli indirizzi è l'insieme di tutti gli indirizzi che un processo può usare per accedere alla memoria.

In un sistema a 32 bit, lo spazio degli indirizzi è di 4GB (2^32), perché il processore ha 32 pin sul bus degli indirizzi. Quindi la limitazione è hardware. (La virtualizzazione può cambiare questa cosa)

Risolve due problemi, la protezione e il riposizionamento. Ogni processo ha il suo spazio degli indirizzi personale.

## Registro base e registro limite

Rilocazione dinamica, mappa lo spazio degli indirizzi su una parte diversa della memoria fisica per ogni processo.

Ogni CPU ha due registri hardware speciali, il registro base e il registro limite.

Il programma viene caricato dove c'è spazio senza riposizionamento. Al momento dell'esecuzione, ogni volta che un processo consulta la memoria, prima di inviare l'indirizzo alla memoria, la CPU somma l'indirizzo con il registro base, contemporaneamente controlla se l'indirizzo calcolato sia uguale o maggiore al registro limite. Se il risultato è maggiore, viene generato un errore (segmentation fault).

Unico problema sono la somma (e il confronto), che rallentano l'accesso alla memoria.

## Cos'è la memoria virtuale?

Consente di eseguire programmianche quando sono parzialmente in memoria. Suddiviso in pagine.
La memoria virtuale è una tecnica che permette di eseguire programmi più grandi di quanto la memoria fisica disponibile possa contenere.

Ogni **pagina** è un intervallo di indirizzi contigui. Queste pagine sono mappate sulla memoria fisica, ma non tutte le pagine devono stare nella memoria fisica per eseguire il programma. Quando il programma fa riferimento a una parte del proprio spazio degli indirizzi che è nella memoria fisica, l'hardware esegue il necessario mappaggio diretto. Quando il programma fa riferimento a una parte del proprio spazio degli indirizzi che non è nella memoria fisica, il sistema operativo è allertato (page fault) di andare a prendere il pezzo mancante e rieseguire l'istruzione fallita.

Lo spazio degli indirizzi virtuali è suddiviso in unità di dimensione fissa, chiamate **pagine**.

Le unità corrispondenti nella emoria fisica sono chiamate **frame** (o page frame).

Pagine e frame sono della stessa dimensione, di solito vanno da 512 byte a 64KB.

## Cos'è la MMU e come funziona?

La MMU (Memory Management Unit) è un componente hardware che si occupa di tradurre gli indirizzi virtuali in indirizzi fisici. È un componente fondamentale per la gestione della memoria virtuale.

Quando il programma esegue un'istruzione che utilizza degli indirizzi, gli indirizzi sono chiamati virtuali e formano lo spazio virtuale degli indirizzi. Sui computer senza memoria virtual, l'indirizzo virtuale viene messo direttamente sul bus e provoca una lettura/scrittua della memoria fisica con lo stesso indirizzo. Quando è usata la memoria virtuale, gli indirizzi non vanno direttamente al bus di memoria, ma vanno prima alla MMU. La MMU traduce l'indirizzo virtuale in un indirizzo fisico e lo mette sul bus di memoria.

È dentro il processore.

## Cos'è il TLB?

Per velocizzare la paginazione e per gestire grandi spazi degli indirizzi virtuali, si può usare il TLB (Translation Lookaside Buffer).
Si trova al di fuori dalla MMU e consiste in un numero ridotto di voci, raramente più di 256.

Contiene le traduzioni più recenti degli indirizzi virtuali in indirizzi fisici. Se la traduzione è presente nel TLB, la MMU non deve fare una ricerca nella tabella delle pagine.

Esempio:

- Indirizzo -> MMU
- MMU controlla dentro la TLB
- Se c'è (TLB HIT) e non viola protezione, l'indirizzo fisico viene preso dal TLB e messo sul bus
- Se non c'è (TLB MISS) va a cercare nella tabella delle pagine, quindi sfratta una delle voci dal TLB e la rimpiazza con la voce della tabella dele pagine appena cercata.

Due tipi di MISS:

- **Soft miss** - non in TLB, ma in memoria (aggiorno TLB)
- **Hard miss** - non in TLB, non in memoria (page fault, carico dal disco)

## Algoritmo ottimale

Impostato come riferimento, non è implementabile. Si basa sul fatto che il processo che verrà usato più tardi è quello che verrà rimpiazzato.

Ogni pagina viene etichetta con il numero di istruzioni che verranno eseguite prima che venga usata di nuovo. Quando si verifica un page fault, si rimuove la pagina con il numero più alto.

## Algoritmo NRU (Not Recently Used)

Due bit, R e M, per ogni pagina. R viene impostato a 1 quando la pagina viene referenziata (lettura/scrittura), M quando viene scritta.
Devono essere aggiornati ad ogni riferimento della memoria, essenziale che sia fatto in hardware.

Può essere simulato in software.
Una volta avviato il processo, tutte le voci della tabella delle pagine vengono contrassegnate come non in memoria. Appena una pagina viene referenziata si avrà un page fault, il sistema operativo imposta R e modifica la voce mettendola in read-only. Se la pagina viene modifica si avrà un altro page fault, il sistema operativo imposta M, e la voce viene messa in read-write.

Periodicamente, viene ripulito il bit R.

Quando avviene un page fault, il sistema operativo ispeziona la tabella e suddivide le pagine in quattro categorie:

- Classe 0 - R=0, M=0
- Classe 1 - R=0, M=1
- Classe 2 - R=1, M=0
- Classe 3 - R=1, M=1
  
NRU rimuove a caso una pagina dalla classe più bassa e non vuota.

## Algoritmo FIFO (First In First Out)

Lista di pagine attulamente in memoria. La più recente è in coda, la più vecchia in testa. A un page fault, la pagina di testa è rimossa e la nuova aggiunta in coda all'elenco.

Il problema è che molto spesso si vanno a rimuovere pagine molto utilizzate. Per questo motivo il FIFO è raramente usato nella sua forma più rigida.

## Algoritmo seconda chance

Modifica FIFO, evita il problema di gettare una pagina usata di frequente controllando il bit R della pagina più vecchia. Se è 0, la pagina è vecchia e inutilizzata e viene così sostituita immediatamente. Se R è 1, il bit viene azzerato, la pagina è messa in fondo all'elenco e il suo tempo di caricamento aggiornato come se fosse appena arrivata in memoria. Poi la ricerca continua.

Se tutte le pagine sono state referenziate, la seconda chance degenera in un FIFO puro.

## Algoritmo LRU (Least Recently Used)

Teoricamente fattibile, ma non economico.

Lista collegata di tutte le pagine in memoria, con davanti quelle più usate e dietro quelle meno usate. L'elenco deve essere aggiornato ad ogni riferimento di memoria, quindi è molto dispendioso. Inoltre, trovare una pagina, rimuoverla e portarla davanti è molto dispendioso.

Implementazione con hardware speciale, richiede un contatore a 64 bit incrementato automaticamente dopo ogni istruzione. Inoltre, ogni voce della tabella delle pagine deve avere un campo abbastanza grande per il contatore. Dopo ciascun riferimento alla memoria, il valore attuale del contatore è archiviato nella voce della tabella delle pagine nella pagina appena referenziata. Quando si verifica un page fault, il sistema operativo esamina tutti i contatori nella tabella delle pagine per trovare il più basso. Quella pagina è quella usata meno recentemente e verrà rimossa.

## Algoritmo NFU (Not Frequently Used)

Simula l'algortimo LRU via software.

Richiede un contatore software associato a ogni pagina e inizialmente impostato a zero. Il sistema operativo fa la scansione di tutte le pagine in memoria, a ogni interrupt del clock. Per ciascuna pagina viene sommato il bit R (che è 0 o 1) al contatore. I contatori tengono traccia di quante volte ciascuna pagina è stata referenziata.

Quando avviene un page fault la scelta di quale pagina sostituire cade su quella con il contatore più basso.

Il problema principale dell'NFU è che non si dimentica mai nulla.

Facendo una piccola modifica possiamo risolvere questo problema. Invece di sommare, possiamo fare uno shift logico a destra del contatore, e viene aggiunto il bit R a sinistra. Questo metodo è conosciuto come **aging**.

Questo fa si che le pagine che non sono state referenziate per un po' di tempo abbiano un contatore basso, e quindi vengano rimpiazzate.

## Working set

Insieme di pagine che un processo sta usando attualmente.

Cambia nel tempo, quindi bisogna fare un'analisi periodica. Se il working set è più grande della memoria fisica, il processo va in thrashing.

## Algoritmo WSClock (Working Set Clock)

<!-- TODO -->

## Perché non si usa LRU?

Con l’algoritmo LRU (Last Recently Used) viene tolta la pagina utilizzata meno recentemente. In casi limite però degenera a FIFO, ovvero quando la turnazione è dello stesso ordine di grandezza della dimensione della memoria. Poiché però è un algoritmo stack, e dunque non soffre dell’anomalia di Belady, aumentando la memoria diminuiscono i page fault.

Rimane però il problema che ogni volta è necessario un **resorting** delle pagine.

## Anomalia di Belady e algoritmi in cui si presenta

L'anomalia di Belady è un fenomeno che si verifica in alcuni algoritmi di rimpiazzamento delle pagine. In particolare, si verifica quando si aumenta il numero di frame e il numero di page fault aumenta.

L’algoritmo FIFO è un algoritmo che soffre dell’anomalia di Belady: all’aumentare del numero di frame disponibili (e quindi della memoria) i page fault potrebbero aumentare anziché diminuire.

## Algoritmi di stack (proprietà di inclusione)

Gli algoritmi stack godono della proprietà di inclusione: l’insieme delle pagine presenti in memoria caricate all’istante t con n frame è sempre un sottoinsieme di quelle caricate all’istante t con n+1 frame.

Gli algoritmi che soddisfano la proprietà di inclusione **non** sono soggetti all'anomalia di Belady.

## Tabelle delle pagine multilivello

Invece di avere una tabella delle pagine unica, la suddivido in più livelli. Questo mi permette di avere più flessibilità e possibilimente di risparmiare spazio. Invece di un'unica tabella con 2^20 voci (1 milione), avrò una prima tabella di 1024 voci e per ogni voce una seconda tabella di 1024 voci.

Esempio:

- 10 bit - PT1 - prima tabella
- 10 bit - PT2 - seconda tabella
- 12 bit - offset

Nella tabella delle pagine multilivello si cerca di risolvere il problema dei processi di grande dimensioni, tieni a mente ch e per ogni processo tu hai una tabella delle pagine e se il processo è grande avrai una tabella delle pagine grande (tante pagine = tante voci nella tabella).

La tabella delle pagine deve stare in memoria e quindi occupa spazio, per evitare di tenere tutta la tabella delle pagine in memoria si usano le tabelle delle pagine multilivello.
Quindi tieni in memoria solo la parte di tabella delle pagine di cui hai bisogno.
La ricerca diventa più lunga.

Mentre prima per trovare una voce nella tabella delle pagine ti bastava l'indirizzo che veniva diviso in bit più significativ i per trovare la voce nella tabella delle pagine e offset ora avrai un indirizzo logico più lungo.

Quest'indirizzo logico metti che è di 32 bit di cui 10+10+12. I primi 10 li usi nel primo livello per trovare la prima voce, a questa aggiungi gli altri 10 per trovare la voce nel secondo livello in questo caso gli ultimi 12 sono di offset quindi nel secondo livello - se c'è - trovi l'indirizzo del frame lo metti a sinistra dell'offset (bit più significativi) e hai l'indirizzo fisico

## Tabelle delle pagine invertite

Nella tabella delle pagine invertite tu non hai una tabella delle pagine per processo ma hai una tabella unica.
Invece di avere le voci della tabella per ogni pagina di processo hai una voce per ogni frame in memoria (riduci di molto lo spazio che occupa la tabella visto che i frame sono sempre meno delle pagine).
La ricerca diventa più difficile perché per trovare l'indirizzo di un frame non ti basta il numero di pagina ma hai bisogno d i processo-numero pagina.
Per velocizzare la ricerca si usano le hash table e il TLB.
TLB ha lo stesso funzionamento della tabella delle pagine; mentre nell'hash table generi un valore su certi parametri e poi crei la catena di collisione etc. Facendo così prima controlli il TBL se non sta li controlli l'hash table.

## Perché si usano le page table invertite?

Invece di avere una voce per pagina, ho solo una voce per frame. La voce tiene traccia di quale processo e pagina associata, quindi coppia (N, P), si trova nel frame. Non ho più, quindi, di una tabella per processo, ma una tabella unica.

Quando un processo N referenzia la pagina P, non posso più cercare solo la pagina P, ma devo cercare la voce (N, P) nella tabella.

Per velocizzare la traduzione si usa il TLB. Nel caso di MISS si va a cercare nella tabella.

Per velocizzare la ricerca nella tabella, si può usare una tabella hash. In caso di collisione, si può usare una lista concatenata. Una volta trovata la voce, si aggiorna il TLB.

Per due motivi:

- la page table potrebbe essere molto grande o potrebbe non servirmi tutta, perciò viene divisa in più livelli e si alloca solo quello che serve (page table multilivello),
- dividendo le pagine su più livelli però, per ricavare l’indirizzo fisico serve fare diversi accessi in memoria.

Con la page table invertita si utilizza una sola tabella per il sistema (e non una per processo) e l’indirizzo logico viene trasformato da una funzione di hashing che restituisce un valore utilizzato come indice all’interno della tabella di hash: se la pagina è presente in memoria, all’indice ci sarà la terna pagina-processo-frame.

## Politiche globali vs locali (dettagliato)

Gli algoritmi di rimpiazzamento delle pagine possono essere classificati in due categorie: globali e locali.

Quando serve più spazio e bisogna rimpiazzare una pagina, la vittima può essere scelta tra le pagine di un processo o tra le pagine del sistema (quindi anche tra quelle di altri processi). Nel primo caso si parla di politica di allocazione locale, nel secondo di politica di allocazione globale.

Ad ogni processo viene assegnato un flag per indicare che tipo di allocazione utilizzare. Questo flag viene assegnato sulla base della **Page Fault Frequency** (PFF):

- se è troppo alta, il working set è troppo piccolo e quindi si deve passare ad una politica globale,
- se è troppo bassa, il working set è fin troppo grande e si deve passare ad una politica locale.

Vengono stabilite due soglie, una alta (A) e una bassa (B):

- $\text{PFF}>A$: politica di allocazione globale
- $B \leq \text{PFF} \leq A$: si mantine la politica corrente
- $\text{PFF} < B$: politica di allocazione locale

Se non si mantenesse la politica corrente tra A e B, il sistema andrebbe in **trashing**, fenomeno che si verifica quando la dimensione totale del working set necessari a tutti i processi supera le capacità del sistema. Ovvero, i processi utilizzano il loro quanto di tempo generando page fault anziché elaborare dati.

## Dimensione ottimale delle pagine? (non solo formula)

Mediamente metà della pagina finale è vuota. Lo spazio in più è sprecato. Questo spreco è detto frammentazione interna.

In generale una dimensione di pagina grande fa sì che vi sia nella memoria più spazio inutilizzato rispetto a pagina di piccole dimensioni.

D'altra parte, le pagine piccole comportano che il programma richieda molte pagine, ossia una tabella delle pagine estesa. I trasferimenti da e verso il disco sono generalmente di una pagina per volta, con la maggior parte del tempo impiegato per la ricerca e il ritardo della rotazione; trasferire pagine piccole dunque richiede quasi tanto tempo quanto trasferire una pagina grande.

Poiché le voci nel TLB sono poche e sono fondamentali per migliorare le prestazioni, utilizzare quando possibile pagine di grandi dimensioni paga. Per bilanciare gli svantaggi, i sistemi operativi utilizzano a volte pagine di dimensioni diverse per le diverse parti del sistema: per esempio, pagine grandi per il kernel e più piccole per i processi utente.

La dimensione ottimale di una pagina si trova ponendo la derivata prima dell’overhead posta uguale 0. Il valore ottenuto è $p=\sqrt{2se}$ con $p=$ dimensione della pagina, $s=$ dimensione media dei processi e $e=$ dimensione della entry della page table.

Si arriva a questo dalla derivata prima del calcolo dell’overhead (spazio sprecato dalla tabella delle pagine). Si utilizza la derivata prima perchè aiuta a identificare il punto in cui il rapporto tra l'overhead e la dimensione delle pagine è ottimale

## In quale contesti abbiamo parlato di frammentazione esterna?

- Nel caso della **memoria gestita a liste collegate**:
  - **algoritmi** che lo causano o che lo controllano (first fit, next fit, best fit, worst fit, quick fit)
  - quando un **processo** viene **swappato da disco in memoria** e **non c’è spazio** si deve fare **compattazione della memoria**
- Nel caso dell’**allocazione contigua dei file**:
  - se un file viene cancellato, si crea un buco di tra i file adiacenti, che non può essere riempito da un file più grande.
  
  <!-- - ogni **file inizia in un nuovo blocco**: se **richiede 2.5** blocchi, quello **0.5** andrà **sprecato**. -->

## Thrashing

Un processo che causa page fault ogni poche istruzioni è detto thrashing. Si verifica quando la memoria disponibile è insufficiente per contenere il working set per intero.

## Gerarchie di memoria

1. Registri - molto veloci, poco spazio
2. Cache (L1, L2, L3) - veloci, poco spazio
3. Memoria principale (RAM) - veloce, spazio medio
4. Memoria secondaria (disco) - lenta, molto spazio

## Swap di un processo

Se non c'è spazio in memoria, si può mandare un processo inattivo su disco. Questo processo si chiama swap out. Quando si vuole riportare il processo in memoria, si chiama swap in.

Se **processo è inutilizzato**, per evitare che occupi memoria inutilmente viene **trasferita parte di esso su disco**, tutto **tranne il PCB** che rimane in memoria, per fare scheduling.

Quando viene fatto swapping su un processo non utilizzato da tanto tempo, lo swap è preventivo, non reattivo: non viene fatto in presenza di un calo di prestazioni.

(**Memoria secondaria**) Per fare swap può essere utile avere una **partizione del disco dedicata allo swap** (area di swap) o meglio ancora un **disco separato dal file system**. Quando viene avviato il primo processo viene riservata parte di questa area per il processo. Quando un processo termina viene liberato lo spazio che occupava su disco.

Un’alternativa è non allocare nulla in anticipo, allocando solo quando si deve fare swap su disco e deallocando quando si fa swap in memoria. I processi non sono così vincolati ad un area di swap ma **bisogna tenere traccia dell’indirizzo del disco in cui si trova ogni pagina con una tabella che indica per ogni processo per ogni sua pagina** dove queste si trovano sul disco.

Quando non è possibile avere una partizione dedicata, possono essere utilizzati file speciali del normale file system, come fa Windows

## Backing Store

Utilizzato nella **paginazione**. Se la **memoria è troppo piccola** si rimanda un processo **interamente** **o a pezzi su disco**. Mandare su disco non è un’operazione banale. Innanzitutto, il disco è molto più grande della memoria e poi è una periferica lenta.

Si utilizza **l’area di swap.** Si possono fare due scelte nella gestione dell’area di swap:

1. Scelta **orientata alle prestazioni:** data una page table in memoria, mi troverò la **stessa page table** nell’area di swap, **ma ho l’inverso**: se una pagina è in memoria, non sarà sul disco e viceversa. Questa scelta permette di **velocizzare le operazioni ma ha un difetto**: tutti i rettangoli grigi sono **spazio sprecato su disco**, che non si può usare per i file, che però si potrebbe usare per fare swap di altri processi.
2. Scelta **orientata al consumo:** rinuncio a un po’ di prestazioni e cerco di usare l’area di swap nella maniera più sana possibile: devo utilizzare una **tabella intermedia**, la **Disk map**, e quello che non trovo nella page table, vado a vedere nella disk map in che punto dell’area di swap si trova. Questo mi permette di **non sprecare spazio**, però mi obbliga a fare un passaggio in più, **raddoppiando i tempi**.

<!-- File system -->

<!--
Allocazione contigua
Allocazione a liste collegate
Allocazione a liste collegate con tabella in memoria
-->

## Che cos'è una directory?

Le directory sono file di sistema usati per mantenere la struttura del file system.

In questo caso la voce della directory può essere più corta: solo il nome del file e il numero dell'i-node.

una directory è un file che contiene una lista di file e directory. Ogni voce nella directory contiene il nome del file e un puntatore al file.

## I-node. Come è formato e cosa contiene (quali sono i campi)?

Gli attributi contengono la dimensione del file, tre orari (creazione, ultimo accesso e ultima modifica), proprietario, gruppo, informazioni di protezione e il numero di voci di directory che punta a quel file. L'ultimo campo è necessario a causa dei link.

I primi 12 indirizzi del disco sono memorizzati nell'i-node stesso, così per i file piccoli tutte le informazioni necessarie sono nell'i-node, letto dal disco in memoria principale quando è aperto il file.
Per qualche file piuttosto grande, uno degli indirizzi nell'i-node è l'indirizzo di un blocco del disco chiamato blocco indiretto singolo (single indirect block). Questo blocco contiene indirizzi aggiuntivi del disco.
Se anche questo non basta vi è nell'i-node un altro indirizzo contenente una lista di blocchi indiretti singoli, chiamato blocco indiretto doppio (double indirect block). Ognuno di questi blocchi indiretti singoli punta a un qualche centinaio di blocchi di dati. Se non fosse ancora sufficiente può essere usato un blocco indiretto triplo (triple indirect block).

Rispetto alle liste collegate in memoria, L'i-node ha bisogno di essere in memoria solo quando il file corrispondente è aperto.

All’interno del file system vengono utilizzate delle **strutture dati per gestire i file**, gli i-node (index node).

Ogni file ha un i-node **contenente i metadati del file** (non il nome) ed una serie di **puntatori** a datablock contenenti le informazioni. Alcuni degli attributi dei file inseriti all’interno degli i-node possono essere: *dimensione, permessi di accesso, marcature temporali di quando il file è stato creato, modificato, referenziato, il proprietario, il tipo*.

è quella di memorizzare gli attributi negli i-node,

- Metadati
  - Tipo di file
  - Owner
  - Modalità di accesso
- Puntatori ai blocchi di dati (13 puntatori)

## FAT (FAT32, FAT16)

L'accesso casuale è inoltre molto più semplice.

La FAT sta sul disco e il sistema ne tiene una parte in memoria, con cui lavorare per continuare a leggere su disco, e periodicamente aggiornata.

File Allocation Table, è un file system che utilizza una tabella per tenere traccia di tutti i file presenti sul disco. La tabella contiene un elenco di tutti i file e delle directory presenti sul disco, e per ciascuno di essi contiene informazioni come la posizione sul disco e la dimensione.

La differenza tra FAT16 e FAT32 è la dimensione dei puntatori (entry della FAT). FAT16 utilizza puntatori a 16 bit, mentre FAT32 utilizza puntatori a 32 bit.

Implementando i file con allocazione a lista, l’accesso casuale è molto inefficiente e inoltre, in caso di file delle stesse dimensioni del datablock, essendo i primi byte dedicati al puntatore all’elemento successivo, per leggere l’intero blocco si richiedono l’acquisizione e la concatenazione di informazioni contenute in due blocchi.

Entrambi i problemi si risolvono inserendo i puntatori agli elementi successivi in una tabella, la File Allocation Table, che si trova nella prima traccia del disco e viene copiata in memoria quando utilizzata per motivi di prestazioni.

Lo svantaggio principale è che, dovendo rimanere in memoria, non è adatta per dischi di grosse dimensioni.

Il limite dipende dallo spazio di indirizzamento: $2^{16}$ entry → $2^{16}$ datablock.

<!-- la grandezza massima del disco dipende dalla grandezza del settore (2TB with 512B, 16TB with 4KB) -->

## VFS

## LVM

## LVM e differenza con RAID

## Disk Caching

## Consistenza del file system

## Journaled file system, dove si trovano i log?

## Cos'è una free list e problema nella gestione

## Virtual file system e V-Node

## File ad allocazione contigua

<!-- I/O -->
## Come si può fare I/O?

## DMA e I/O tramite DMA

## I/O programmato

## I/O mappato in memoria

## Se ho un sistema di i/o mappato in memoria, posso fare uso di i/o programmato?

<!-- Deadlock -->
## Algoritmo di Dijkstra

<!-- TODO -->

Algoritmo di Dijkstra per la rilevazione del deadlock. Si costruisce un grafo con i processi come nodi e le risorse come archi. Si cerca un ciclo nel grafo. Se c'è un ciclo, c'è un deadlock. Se non c'è un ciclo, non c'è un deadlock.

## Stato sicuro

Uno stato è sicuro se esiste un ordine di scheduling nel quale ogni processo può essere eseguito fino alla conclusione, anche se tutti i processi richiedono all'improvviso il loro massimo numero di risorse (improbabile).

Uno stato non sicuro non corrisponde a uno stato di deadlock.

## Condizioni di Coffman

1. **Mutua esclusione** - ciascuna risorsa è o in uso o disponibile.
2. **Hold and wait** (possesso e attesa) - i processi che allo stato attuale possiedono delle risorse, assegnate loro in precedenza, possono richiederne di nuove.
3. **No preemption** (impossibilità di prelazione) - una risorsa non può essere tolta ad un processo finché non ha finito di usarla. Deve essere rilasciata volontariamente.
4. **Attesa circolare** - deve esistere un ciclo di processi, ciascuno in attesa di una risorsa posseduta dal successivo.

## Algoritmo del banchiere

## Algoritmo dello struzzo, quando ha senso usarlo?

L’algoritmo dello struzzo **ignora** i deadlock.

Ha senso ignorarli quando non è il problema più grave: se un sistema va in crash 3 volte al giorno e in deadlock una volta a settimana, i deadlock non sono il problema principale.

<!-- Multimedia -->
## Codifica vs Compressione

- **Codifica** - stabilire un formato digitale, ovvero una corrispondenza tra un'informazione analogica e la sequenza di bit che la rappresenta.
- **Compressione** - conseguenza di una codifica ben strutturata, ovvero la riduzione della quantità di bit necessari per rappresentare un'informazione.

## Buffer overrun e buffer underrun

## GoP, derivazioni su scheduling e file system (Datablock > GoP; Datablock < GoP)

## I-frame, P-frame, B-frame

- **I-frame** (indipendenti) - "Intra-coded frame", contiene un'immagine completa
- **P-frame** (predicono) - "Predicted frame", contiene solo le differenze rispetto all'immagine precedente, (tramite motion vector)
- **B-frame** (in prestito) - "Bi-predictive frame", contiene le differenze rispetto all'immagine precedente e successiva (tramite motion vector)

<!-- Cloud -->
## Differenza tra Hypervisor tipo 1 e tipo 2

## Virtualizzazione dell'OS

## SPI (SaaS, PaaS, IaaS)

## Elasticità vs scalabilità (cloud)
