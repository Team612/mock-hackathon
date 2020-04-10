using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class followTarget : MonoBehaviour
{
    public Transform Player;
    public float MoveSpeed = 4f;
    public float MaxDist = 10f;
    public float MinDist = 5f;

    // Start is called before the first frame update
    void Start()
    {
        
    }

    // Update is called once per frame
    void Update()
    {
        transform.LookAt(Player);
     
        if(Vector3.Distance(transform.position,Player.position) >= MinDist){
     
          transform.position += transform.forward * MoveSpeed * Time.deltaTime;
        }

        if(Vector3.Distance(transform.position,Player.position) <= MinDist){
            Debug.Log("hit");
        }
    }
}
