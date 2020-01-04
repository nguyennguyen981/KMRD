{this.state.IsLoading ?
<View style={{width: '100%', height: '100%',justifyContent:'center',alignItems:'center'}}>
  <ActivityIndicator size="large" color="#0000ff" />
</View>
:       }

      <CarasoulImage data={this.state.data.ImageUrl}/>
