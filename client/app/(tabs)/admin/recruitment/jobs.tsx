import { useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
export default function JobsPage() {
    const [data,setData] = useState([]);
  useEffect(()=>{
    fetch("http://10.139.246.127:3000/nhanvien").then((Response)=>Response.json().then((json)=>{
      console.log(json);
      setData(json);
    }).catch((error)=>console.log(error)))
  },[])
  return (
    <View>
        
          <FlatList
            data={data}
            
            renderItem={({ item }) => (
              <View >
                <Text>{item['MaNhanVien']}-{item['HoVaTen']}</Text>
                
              </View>
            )}
          />
        
      </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eff1f4ff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: '#0e0000ff',
  },
});