import * as React from 'react'
import {Text, View, TouchableOpacity, StyleSheet, TextInput, Image} from 'react-native'
import * as Permissions from 'expo-permissions';
import {BarCodeScanner} from 'expo-barcode-scanner';

export default class TransactionScreen extends React.Component{
    constructor(){
        super();
        this.state={
        hasCameraPermissions:null,
        scanned:false,
        scannedData:'',
        buttonState:'normal',
        scannedBookId:'',
        scannedStudentId:'',
        }
    }
    getCameraPermission=async(id)=>{
        const {status}=await Permissions.askAsync(Permissions.CAMERA)
        this.setState({hasCameraPermissions:status==="granted",
    buttonState:id,scanned:false})

    }
    handleBarcodeScanner=async({type,data})=>{
        const {buttonState}=this.state
        if(buttonState==="BookId"){
            this.setState({
                scanned:true,
                scannedBookId:data,
                buttonState:'normal',
            })
        } 
        else if(buttonState==="StudentId"){
            this.setState({
                scanned:true,
                scannedStudentId:data,
                buttonState:'normal',
            })
        }
    }
    render(){
        const hasCameraPermissions=this.state.hasCameraPermissions;
        const scanned=this.state.scanned;
        const buttonState=this.state.buttonState;
        if(buttonState!=="normal" && hasCameraPermissions){
            return(
                <BarCodeScanner onBarCodeScanned={scanned?undefined:this.handleBarcodeScanner}
                style={StyleSheet.absoluteFillObject}/>
            );
        } else if(buttonState==='normal'){

        return (
            <View styles={styles.container}>
                <View>
                    <Image
                    source={require("../assets/booklogo.jpg")}
                    style={{width:200,height:200}}
                    />
                    <Text style={{fontSize:50}}>
                        Wireless Library App
                    </Text>
                </View>

                    <View style={styles.inputView}>
                        <TextInput
                        style={styles.inputBox}
                        placeholder="Book Id"
                        value={this.state.scannedBookId}
                        />
                        <TouchableOpacity onPress={()=>{
                            this.getCameraPermission("Book Id")
                        }}>
                            <Text style={styles.buttonText}>Scan</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.inputView}>
                        <TextInput
                        style={styles.inputBox}
                        placeholder="Student Id"
                        value={this.state.scannedStudentId}
                        />
                        <TouchableOpacity onPress={()=>{
                            this.getCameraPermission("Student Id")
                        }}>
                            <Text style={styles.buttonText}>Scan</Text>
                        </TouchableOpacity>
                    </View>
            </View>

        )
            }
    }
}

const styles = StyleSheet.create({
    scanButton:{
        backgroundColor:'yellow',
        padding:10,
        margin:10,
    },
    container:{
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    },
    displayText:{
        fontSize:15,
        textDecorationLine:'underline',
    },
    buttonText:{
        fontSize:20,
        textAlign:'center',
        marginTop:10,
        marginLeft: 20
    },
    inputView:{
        flexDirection:'row',
        margin:20,
    },
    inputBox:{
        width:200,
        height:40,
        borderWidth:1.5,
        fontSize:20
    },
})